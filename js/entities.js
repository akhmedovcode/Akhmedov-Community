import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { DIFFICULTIES, TEAM } from './config.js';
import { WeaponSystem } from './weapons.js';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function distance2D(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

export class Character {
  constructor(scene, team, position, color) {
    this.scene = scene;
    this.team = team;
    this.group = new THREE.Group();
    this.mesh = this.createMesh(color);
    this.group.add(this.mesh);
    this.group.position.copy(position);
    this.scene.add(this.group);

    this.velocity = new THREE.Vector3();
    this.forward = new THREE.Vector3(0, 0, -1);
    this.height = 2.6;
    this.radius = 1.1;
    this.speed = 10;
    this.health = 100;
    this.armor = 100;
    this.isAlive = true;
    this.aimYaw = 0;
    this.aimPitch = 0;
    this.recoilPitch = 0;
    this.weapons = new WeaponSystem(this);
    this.isADS = false;
    this.isCrouching = false;
    this.isRunning = false;
    this.ragdollTimer = 0;
  }

  createMesh(color) {
    const root = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.05 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.8, 2.2, 5, 8), material);
    body.castShadow = true;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 18), new THREE.MeshStandardMaterial({ color: 0xf1cfb0 }));
    head.position.y = 1.75;
    head.castShadow = true;
    root.add(body, head);
    return root;
  }

  takeDamage(amount) {
    const armorAbsorb = Math.min(this.armor, amount * 0.35);
    this.armor -= armorAbsorb;
    this.health -= amount - armorAbsorb * 0.5;
    if (this.health <= 0) this.die();
  }

  die() {
    this.isAlive = false;
    this.health = 0;
    this.ragdollTimer = 4;
    this.mesh.rotation.z = Math.random() * 1.2 - 0.6;
    this.mesh.rotation.x = 1.3;
    this.group.position.y = 1;
  }

  updateCommon(delta) {
    this.weapons.update(delta);
    if (!this.isAlive) {
      this.ragdollTimer = Math.max(0, this.ragdollTimer - delta);
      this.group.rotation.y += delta * 0.35;
      return;
    }
    this.recoilPitch = Math.max(0, this.recoilPitch - delta * 5.5);
  }

  resolveCollisions(colliders) {
    colliders.forEach((collider) => {
      const x = clamp(this.group.position.x, collider.minX, collider.maxX);
      const z = clamp(this.group.position.z, collider.minZ, collider.maxZ);
      const dx = this.group.position.x - x;
      const dz = this.group.position.z - z;
      const dist = Math.hypot(dx, dz);
      if (dist < this.radius) {
        const push = (this.radius - dist) || this.radius;
        const nx = dist === 0 ? 1 : dx / dist;
        const nz = dist === 0 ? 0 : dz / dist;
        this.group.position.x += nx * push;
        this.group.position.z += nz * push;
      }
    });
  }
}

export class Player extends Character {
  constructor(scene, camera, team, position) {
    super(scene, team, position, team === 'T' ? 0xff9b3d : 0x53adff);
    this.camera = camera;
    this.group.visible = false;
    this.flashTimer = 0;
    this.verticalVelocity = 0;
    this.onGround = true;
  }

  update(delta, frame, colliders) {
    this.updateCommon(delta);
    if (!this.isAlive) return;

    const sensitivity = 0.0018;
    this.aimYaw -= frame.mouseDelta.x * sensitivity;
    this.aimPitch -= frame.mouseDelta.y * sensitivity;
    this.aimPitch = clamp(this.aimPitch, -1.35, 1.35);

    const move = new THREE.Vector3();
    const forward = new THREE.Vector3(Math.sin(this.aimYaw), 0, Math.cos(this.aimYaw) * -1);
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
    if (frame.keys.has('KeyW')) move.add(forward);
    if (frame.keys.has('KeyS')) move.sub(forward);
    if (frame.keys.has('KeyA')) move.sub(right);
    if (frame.keys.has('KeyD')) move.add(right);

    this.isRunning = frame.keys.has('ShiftLeft') || frame.keys.has('ShiftRight');
    this.isCrouching = frame.keys.has('KeyC');
    this.isADS = frame.ads;

    if (move.lengthSq() > 0) {
      move.normalize();
      const speed = this.speed * (this.isRunning ? 1.35 : 1) * (this.isCrouching ? 0.6 : 1) * this.weapons.active.speedMultiplier;
      this.group.position.addScaledVector(move, delta * speed);
    }

    if (frame.keys.has('Space') && this.onGround) {
      this.verticalVelocity = 7.8;
      this.onGround = false;
    }
    this.verticalVelocity -= 18 * delta;
    this.group.position.y += this.verticalVelocity * delta;
    if (this.group.position.y <= 2.6) {
      this.group.position.y = 2.6;
      this.verticalVelocity = 0;
      this.onGround = true;
    }

    this.resolveCollisions(colliders);
    this.camera.position.set(this.group.position.x, this.group.position.y + (this.isCrouching ? 0.8 : 1.3), this.group.position.z);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.aimYaw;
    this.camera.rotation.x = this.aimPitch + this.recoilPitch;
  }
}

export class Bot extends Character {
  constructor(scene, team, position, difficulty) {
    super(scene, team, position, team === 'T' ? 0xff9b3d : 0x53adff);
    this.difficulty = DIFFICULTIES[difficulty];
    this.targetPoint = position.clone();
    this.state = 'advance';
    this.fireIntent = false;
    this.decisionTimer = 0;
    this.objectiveCarrier = false;
  }

  update(delta, colliders, level, player, bots, objectiveMode) {
    this.updateCommon(delta);
    if (!this.isAlive) return;

    this.decisionTimer -= delta;
    const enemies = [player, ...bots].filter((entity) => entity !== this && entity.team !== this.team && entity.isAlive);
    const visibleEnemy = enemies.find((enemy) => distance2D(enemy.group.position, this.group.position) < 32);

    if (this.decisionTimer <= 0) {
      this.decisionTimer = Math.max(0.18, 0.55 / this.difficulty.reaction);
      if (visibleEnemy) {
        this.state = 'engage';
        this.targetPoint = visibleEnemy.group.position.clone();
      } else if (objectiveMode === 'bomb') {
        const site = level.config.objectives.bombSites[Math.floor(Math.random() * level.config.objectives.bombSites.length)];
        this.state = 'advance';
        this.targetPoint = new THREE.Vector3(site.x, this.group.position.y, site.z);
      } else if (objectiveMode === 'hostage') {
        const primary = this.team === 'CT' ? level.config.objectives.hostages[0] : level.config.objectives.hostages[1];
        this.targetPoint = new THREE.Vector3(primary.x, this.group.position.y, primary.z);
      } else {
        const nav = level.navPoints[Math.floor(Math.random() * level.navPoints.length)];
        if (nav) this.targetPoint = nav.clone();
      }
    }

    const direction = new THREE.Vector3().subVectors(this.targetPoint, this.group.position);
    const flat = new THREE.Vector3(direction.x, 0, direction.z);
    const distance = flat.length();
    if (distance > 1.5) {
      flat.normalize();
      this.group.position.addScaledVector(flat, delta * this.speed * this.difficulty.speed * (this.state === 'engage' ? 0.8 : 1));
      this.aimYaw = Math.atan2(flat.x, -flat.z);
    }

    if (visibleEnemy) {
      const target = visibleEnemy.group.position;
      const idealYaw = Math.atan2(target.x - this.group.position.x, -(target.z - this.group.position.z));
      this.aimYaw = THREE.MathUtils.lerp(this.aimYaw, idealYaw, delta * (3 + this.difficulty.aim * 2));
      this.fireIntent = Math.random() < 0.92 * this.difficulty.aim;
      this.isADS = distance > 14;
    } else {
      this.fireIntent = false;
      this.isADS = false;
    }

    this.resolveCollisions(colliders);
  }
}

export function createTeam(scene, levelConfig, difficulty, playerTeam = 'CT') {
  const bots = [];
  const spawnOffsets = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(3, 0, 4),
    new THREE.Vector3(-4, 0, -3),
    new THREE.Vector3(5, 0, -6),
  ];

  spawnOffsets.forEach((offset, index) => {
    const tPos = new THREE.Vector3(levelConfig.spawns.T.x, levelConfig.spawns.T.y, levelConfig.spawns.T.z).add(offset);
    const ctPos = new THREE.Vector3(levelConfig.spawns.CT.x, levelConfig.spawns.CT.y, levelConfig.spawns.CT.z).add(offset.clone().multiplyScalar(-1));
    bots.push(new Bot(scene, 'T', tPos, difficulty));
    bots.push(new Bot(scene, 'CT', ctPos, difficulty));
  });

  const removeIndex = bots.findIndex((bot) => bot.team === playerTeam);
  if (removeIndex >= 0) {
    const [removed] = bots.splice(removeIndex, 1);
    scene.remove(removed.group);
  }
  return bots;
}

export { TEAM };
