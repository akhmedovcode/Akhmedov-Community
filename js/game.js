import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { TEAM } from './config.js';
import { AudioEngine } from './audio.js';
import { InputController } from './input.js';
import { buildLevel } from './map.js';
import { Player, createTeam } from './entities.js';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.minimap = document.getElementById('minimap');
    this.ui = {
      menu: document.getElementById('menu'),
      roundEnd: document.getElementById('round-end'),
      roundEndTitle: document.getElementById('round-end-title'),
      roundEndBody: document.getElementById('round-end-body'),
      tScore: document.getElementById('t-score'),
      ctScore: document.getElementById('ct-score'),
      health: document.getElementById('health-value'),
      armor: document.getElementById('armor-value'),
      weaponName: document.getElementById('weapon-name'),
      weaponDetail: document.getElementById('weapon-detail'),
      modeLabel: document.getElementById('mode-label'),
      roundTimer: document.getElementById('round-timer'),
      roundStatus: document.getElementById('round-status'),
      eventFeed: document.getElementById('event-feed'),
      objectiveLabel: document.getElementById('objective-label'),
    };

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.1, 300);
    this.clock = new THREE.Clock();
    this.audio = new AudioEngine();
    this.input = new InputController(this.canvas);

    this.level = null;
    this.player = null;
    this.bots = [];
    this.projectiles = [];
    this.grenades = [];
    this.impactDecals = [];
    this.mode = 'bomb';
    this.running = false;
    this.roundLength = 150;
    this.roundTime = this.roundLength;
    this.maxRounds = 10;
    this.scores = { T: 0, CT: 0 };
    this.activeDifficulty = 'veteran';
    this.playerTeam = 'CT';
    this.currentMap = 'urban';
    this.plantedBomb = null;
    this.rescuedHostages = 0;
    this.roundTransition = 0;
    this.feedItems = [];

    this.setupScene();
    this.bindUI();
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  setupScene() {
    this.scene.background = new THREE.Color(0x0f1724);
    this.scene.fog = new THREE.Fog(0x0f1724, 45, 140);
    const hemi = new THREE.HemisphereLight(0xc5dcff, 0x0b1018, 1.1);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1.35);
    dir.position.set(28, 38, 18);
    dir.castShadow = true;
    dir.shadow.mapSize.set(2048, 2048);
    dir.shadow.camera.left = -80;
    dir.shadow.camera.right = 80;
    dir.shadow.camera.top = 80;
    dir.shadow.camera.bottom = -80;
    this.scene.add(dir);
  }

  bindUI() {
    document.getElementById('start-button').addEventListener('click', () => {
      const map = document.getElementById('map-select').value;
      const mode = document.getElementById('mode-select').value;
      const difficulty = document.getElementById('difficulty-select').value;
      const rounds = Number(document.getElementById('round-select').value);
      const team = document.getElementById('team-select').value;
      this.start({ map, mode, difficulty, rounds, team });
    });

    document.getElementById('howto-button').addEventListener('click', () => {
      document.getElementById('howto-panel').classList.toggle('hidden');
    });

    this.canvas.addEventListener('click', () => {
      if (this.running) this.input.requestPointerLock();
    });
  }

  resetWorld() {
    this.projectiles = [];
    this.grenades = [];
    this.impactDecals = [];
    this.plantedBomb = null;
    this.rescuedHostages = 0;
    if (this.level) this.scene.remove(this.level.group);
    if (this.player) this.scene.remove(this.player.group);
    this.bots.forEach((bot) => this.scene.remove(bot.group));
    this.bots = [];
  }

  start({ map, mode, difficulty, rounds, team = 'CT' }) {
    this.resetWorld();
    this.mode = mode;
    this.maxRounds = rounds;
    this.activeDifficulty = difficulty;
    this.playerTeam = team;
    this.currentMap = map;
    this.roundLength = mode === 'bomb' ? 150 : 180;
    this.roundTime = this.roundLength;
    this.scores = { T: 0, CT: 0 };
    this.ui.modeLabel.textContent = mode === 'bomb' ? 'Bomb Defusal' : 'Hostage Rescue';
    this.level = buildLevel(this.scene, map);
    this.scene.background = new THREE.Color(this.level.config.sky);
    this.scene.fog.color = new THREE.Color(this.level.config.fog);

    const spawnConfig = this.level.config.spawns[this.playerTeam];
    const playerSpawn = new THREE.Vector3(spawnConfig.x, spawnConfig.y, spawnConfig.z);
    this.player = new Player(this.scene, this.camera, this.playerTeam, playerSpawn);
    this.bots = createTeam(this.scene, this.level.config, difficulty, this.playerTeam);
    this.running = true;
    this.ui.menu.classList.remove('visible');
    this.ui.roundStatus.textContent = 'Live';
    this.pushFeed(`${TEAM[this.playerTeam]} deployed to ${this.level.config.name}.`);
    this.audio.playObjective();
    this.input.requestPointerLock();
  }

  pushFeed(text) {
    this.feedItems.unshift({ text, id: crypto.randomUUID() });
    this.feedItems = this.feedItems.slice(0, 5);
    this.ui.eventFeed.innerHTML = this.feedItems.map((item) => `<div class="feed-entry"><strong>Intel:</strong> ${item.text}</div>`).join('');
  }

  handleResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  spawnProjectile(origin, direction, damage, owner, speed = 110, color = 0xfff8cc) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color }));
    mesh.position.copy(origin);
    this.scene.add(mesh);
    this.projectiles.push({ mesh, direction, speed, damage, owner, life: 1.2 });
  }

  throwGrenade(owner) {
    const geometry = new THREE.SphereGeometry(0.25, 14, 14);
    const material = new THREE.MeshStandardMaterial({ color: 0x4a4f5b, roughness: 0.7 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.position.copy(owner === this.player ? this.camera.position : owner.group.position.clone().add(new THREE.Vector3(0, 1.4, 0)));
    const direction = new THREE.Vector3(Math.sin(owner.aimYaw), 0.25, -Math.cos(owner.aimYaw)).normalize();
    this.scene.add(mesh);
    this.grenades.push({ mesh, velocity: direction.multiplyScalar(20), owner, timer: 2.2 });
  }

  fireWeapon(shooter) {
    const shot = shooter.weapons.fire();
    if (!shot) return;

    this.audio.playShot(shot.type);
    if (shot.type === 'grenade') {
      this.throwGrenade(shooter);
      return;
    }

    shooter.recoilPitch += shot.recoil * 0.006;
    const origin = shooter === this.player ? this.camera.position.clone() : shooter.group.position.clone().add(new THREE.Vector3(0, 1.3, 0));
    const spread = shot.spread * (shooter.isADS ? 0.35 : 1) * (shooter.isRunning ? 1.6 : 1) * (shooter.isCrouching ? 0.7 : 1);
    const direction = new THREE.Vector3(
      Math.sin(shooter.aimYaw) + (Math.random() - 0.5) * spread,
      -(Math.sin(shooter.aimPitch + shooter.recoilPitch)) + (Math.random() - 0.5) * spread,
      -Math.cos(shooter.aimYaw) + (Math.random() - 0.5) * spread,
    ).normalize();
    this.spawnProjectile(origin, direction, shot.damage, shooter, shot.type === 'sniper' ? 180 : 120, shot.type === 'sniper' ? 0x9fd3ff : 0xfff8cc);
  }

  updateProjectiles(delta) {
    const targets = [this.player, ...this.bots].filter((entity) => entity.isAlive);
    this.projectiles = this.projectiles.filter((projectile) => {
      projectile.life -= delta;
      projectile.mesh.position.addScaledVector(projectile.direction, projectile.speed * delta);
      const pos = projectile.mesh.position;

      const hitWall = this.level.colliders.some((collider) => (
        pos.x > collider.minX && pos.x < collider.maxX && pos.z > collider.minZ && pos.z < collider.maxZ && pos.y > collider.minY && pos.y < collider.maxY
      ));
      if (hitWall || projectile.life <= 0) {
        this.scene.remove(projectile.mesh);
        return false;
      }

      const victim = targets.find((target) => target !== projectile.owner && target.team !== projectile.owner.team && target.group.position.distanceTo(pos) < 1.2);
      if (victim) {
        victim.takeDamage(projectile.damage);
        this.scene.remove(projectile.mesh);
        if (!victim.isAlive) {
          this.pushFeed(`${projectile.owner.team} eliminated ${victim === this.player ? 'you' : victim.team}.`);
        }
        return false;
      }
      return true;
    });
  }

  updateGrenades(delta) {
    this.grenades = this.grenades.filter((grenade) => {
      grenade.timer -= delta;
      grenade.velocity.y -= 20 * delta;
      grenade.mesh.position.addScaledVector(grenade.velocity, delta);
      if (grenade.mesh.position.y < 0.25) {
        grenade.mesh.position.y = 0.25;
        grenade.velocity.y *= -0.45;
        grenade.velocity.x *= 0.82;
        grenade.velocity.z *= 0.82;
      }
      if (grenade.timer <= 0) {
        this.audio.playExplosion();
        const epicenter = grenade.mesh.position.clone();
        [this.player, ...this.bots].filter((entity) => entity.isAlive && entity !== grenade.owner).forEach((entity) => {
          const dist = entity.group.position.distanceTo(epicenter);
          if (dist < 8) entity.takeDamage(Math.max(10, 75 - dist * 8));
        });
        const blast = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffaa66, transparent: true, opacity: 0.55 }));
        blast.position.copy(epicenter);
        this.scene.add(blast);
        this.impactDecals.push({ mesh: blast, life: 0.25, grow: 20 });
        this.scene.remove(grenade.mesh);
        return false;
      }
      return true;
    });
  }

  updateEffects(delta) {
    this.impactDecals = this.impactDecals.filter((effect) => {
      effect.life -= delta;
      effect.mesh.scale.addScalar(delta * effect.grow);
      effect.mesh.material.opacity = Math.max(0, effect.life * 2);
      if (effect.life <= 0) {
        this.scene.remove(effect.mesh);
        return false;
      }
      return true;
    });
  }

  handlePlayerInput(delta, frame) {
    if (!this.player?.isAlive) return;
    if (frame.weaponSlot !== null) this.player.weapons.setWeaponByIndex(frame.weaponSlot);
    if (frame.scroll !== 0) this.player.weapons.cycle(frame.scroll);
    if (frame.reload && this.player.weapons.reload()) this.audio.playReload();
    if (frame.fire && this.player.weapons.canFire()) this.fireWeapon(this.player);
    this.player.update(delta, frame, this.level.colliders);

    const targetFov = this.player.isADS ? this.player.weapons.active.adsFov : 78;
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFov, delta * 10);
    this.camera.updateProjectionMatrix();

    if (frame.interact) this.handleObjectiveInteraction();
  }

  handleObjectiveInteraction() {
    const playerPos = this.player.group.position;
    if (this.mode === 'bomb') {
      const nearbySite = this.level.objectiveMeshes.find((entry) => entry.type === 'bomb' && playerPos.distanceTo(entry.mesh.position) < entry.data.radius + 1.4);
      if (nearbySite && this.player.team === 'CT' && this.plantedBomb) {
        this.plantedBomb = null;
        this.pushFeed('Counter-Terrorists defused the bomb.');
        this.audio.playObjective();
        this.endRound('CT', 'Bomb defused.');
      }
      if (nearbySite && this.player.team === 'T' && !this.plantedBomb) {
        this.plantedBomb = { site: nearbySite, timer: 35, plantedBy: 'player' };
        this.pushFeed(`Bomb planted at Site ${nearbySite.data.name}.`);
        this.audio.playObjective();
      }
    } else {
      const hostage = this.level.objectiveMeshes.find((entry) => entry.type === 'hostage' && !entry.rescued && playerPos.distanceTo(entry.mesh.position) < 3.2);
      if (hostage && this.player.team === 'CT') {
        hostage.rescued = true;
        hostage.mesh.visible = false;
        this.rescuedHostages += 1;
        this.pushFeed(`${hostage.data.name} secured.`);
        this.audio.playObjective();
      }
      const rescue = this.level.objectiveMeshes.find((entry) => entry.type === 'rescue' && playerPos.distanceTo(entry.mesh.position) < entry.data.radius + 1.2);
      if (rescue && this.player.team === 'CT' && this.rescuedHostages > 0) {
        this.endRound('CT', 'Hostages extracted.');
      }
    }
  }

  updateBots(delta) {
    this.bots.forEach((bot) => {
      bot.update(delta, this.level.colliders, this.level, this.player, this.bots, this.mode);
      if (bot.fireIntent && bot.weapons.canFire()) this.fireWeapon(bot);

      if (this.mode === 'bomb') {
        const site = this.level.objectiveMeshes.find((entry) => entry.type === 'bomb' && bot.group.position.distanceTo(entry.mesh.position) < entry.data.radius + 0.8);
        if (bot.team === 'T' && site && !this.plantedBomb) {
          this.plantedBomb = { site, timer: 35, plantedBy: 'bot' };
          this.pushFeed(`Terrorists planted at Site ${site.data.name}.`);
          this.audio.playObjective();
        }
        if (bot.team === 'CT' && site && this.plantedBomb) {
          this.pushFeed('Counter-Terrorist bot defused the bomb.');
          this.audio.playObjective();
          this.plantedBomb = null;
          this.endRound('CT', 'Bomb defused by the defense.');
        }
      } else {
        const hostage = this.level.objectiveMeshes.find((entry) => entry.type === 'hostage' && !entry.rescued && bot.group.position.distanceTo(entry.mesh.position) < 2.8);
        if (hostage && bot.team === 'CT') {
          hostage.rescued = true;
          hostage.mesh.visible = false;
          this.rescuedHostages += 1;
          this.pushFeed(`${hostage.data.name} escorted by CT bot.`);
        }
      }
    });
  }

  updateObjectives(delta) {
    if (this.mode === 'bomb' && this.plantedBomb) {
      this.plantedBomb.timer -= delta;
      this.ui.objectiveLabel.textContent = `Bomb ${this.plantedBomb.timer.toFixed(1)}s`;
      if (this.plantedBomb.timer <= 0) this.endRound('T', 'Bomb detonated.');
    } else if (this.mode === 'hostage') {
      this.ui.objectiveLabel.textContent = `Rescued ${this.rescuedHostages}/2`;
      if (this.rescuedHostages >= 2) this.endRound('CT', 'All hostages rescued.');
    } else {
      this.ui.objectiveLabel.textContent = 'Bomb Sites A/B';
    }

    const aliveT = this.bots.filter((bot) => bot.team === 'T' && bot.isAlive).length + (this.player?.team === 'T' && this.player?.isAlive ? 1 : 0);
    const aliveCT = this.bots.filter((bot) => bot.team === 'CT' && bot.isAlive).length + (this.player?.team === 'CT' && this.player?.isAlive ? 1 : 0);
    if (aliveT === 0) this.endRound('CT', 'Attackers eliminated.');
    if (aliveCT === 0) this.endRound('T', 'Defenders eliminated.');

    this.roundTime -= delta;
    if (this.roundTime <= 0) {
      if (this.mode === 'bomb' && this.plantedBomb) {
        this.endRound('T', 'Bomb timer expired.');
      } else if (this.mode === 'hostage') {
        this.endRound('T', 'Hostages were not extracted in time.');
      } else {
        this.endRound('CT', 'Counter-Terrorists held the line.');
      }
    }
  }

  endRound(team, reason) {
    if (this.roundTransition > 0) return;
    this.scores[team] += 1;
    this.roundTransition = 4;
    this.ui.roundEnd.classList.remove('hidden');
    this.ui.roundEndTitle.textContent = `${TEAM[team]} win`;
    this.ui.roundEndBody.textContent = reason;
    this.ui.roundStatus.textContent = 'Round End';
    this.audio.playObjective();
  }

  resetRound() {
    const options = { map: this.currentMap, mode: this.mode, difficulty: this.activeDifficulty, rounds: this.maxRounds, team: this.playerTeam };
    const scores = { ...this.scores };
    this.start(options);
    this.scores = scores;
    this.ui.roundEnd.classList.add('hidden');
  }

  updateHUD() {
    this.ui.tScore.textContent = String(this.scores.T);
    this.ui.ctScore.textContent = String(this.scores.CT);
    this.ui.health.textContent = Math.round(this.player?.health ?? 0);
    this.ui.armor.textContent = Math.round(this.player?.armor ?? 0);
    this.ui.weaponName.textContent = this.player?.weapons.active.name ?? '—';
    this.ui.weaponDetail.textContent = this.player ? `${this.player.weapons.active.ammo} / ${this.player.weapons.active.reserve}` : '—';
    this.ui.roundTimer.textContent = formatTime(Math.max(0, this.roundTime));
    if (this.player && !this.player.isAlive) this.ui.roundStatus.textContent = 'Spectating';
  }

  drawMinimap() {
    const ctx = this.minimap.getContext('2d');
    ctx.clearRect(0, 0, this.minimap.width, this.minimap.height);
    ctx.fillStyle = '#081019';
    ctx.fillRect(0, 0, this.minimap.width, this.minimap.height);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.strokeRect(10, 10, this.minimap.width - 20, this.minimap.height - 20);
    const toMap = (x, z) => ({ x: ((x + 60) / 120) * this.minimap.width, y: ((z + 60) / 120) * this.minimap.height });

    this.level.objectiveMeshes.forEach((entry) => {
      const point = toMap(entry.mesh.position.x, entry.mesh.position.z);
      ctx.fillStyle = entry.type === 'bomb' ? '#00d1a7' : entry.type === 'hostage' ? '#ffffff' : '#53adff';
      ctx.beginPath();
      ctx.arc(point.x, point.y, entry.type === 'bomb' ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();
    });

    [this.player, ...this.bots].forEach((entity) => {
      if (!entity || !entity.isAlive) return;
      const point = toMap(entity.group.position.x, entity.group.position.z);
      ctx.fillStyle = entity === this.player ? '#53adff' : entity.team === 'T' ? '#ff9b3d' : '#6fc7ff';
      ctx.beginPath();
      ctx.arc(point.x, point.y, entity === this.player ? 5 : 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  tick = () => {
    requestAnimationFrame(this.tick);
    const delta = Math.min(this.clock.getDelta(), 0.033);
    if (!this.running) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    const frame = this.input.consumeFrameState();
    this.handlePlayerInput(delta, frame);
    this.updateBots(delta);
    this.updateProjectiles(delta);
    this.updateGrenades(delta);
    this.updateEffects(delta);
    this.updateObjectives(delta);

    if (this.roundTransition > 0) {
      this.roundTransition -= delta;
      if (this.roundTransition <= 0) {
        if (this.scores.T > this.maxRounds / 2 || this.scores.CT > this.maxRounds / 2) {
          this.running = false;
          this.ui.menu.classList.add('visible');
          this.ui.roundEnd.classList.add('hidden');
          this.ui.roundStatus.textContent = 'Match Over';
          this.pushFeed(`Match complete: ${this.scores.T}-${this.scores.CT}.`);
        } else {
          this.resetRound();
        }
      }
    }

    this.updateHUD();
    this.drawMinimap();
    this.renderer.render(this.scene, this.camera);
  };
}
