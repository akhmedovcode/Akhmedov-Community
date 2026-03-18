import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { MAPS } from './config.js';

const materialSets = {
  urban: {
    floor: new THREE.MeshStandardMaterial({ color: 0x55606e, roughness: 0.95 }),
    wall: new THREE.MeshStandardMaterial({ color: 0x8d98a5, roughness: 0.8 }),
    cover: new THREE.MeshStandardMaterial({ color: 0x5b4637, roughness: 0.7 }),
    accent: new THREE.MeshStandardMaterial({ color: 0xb7c4d3, emissive: 0x111111 }),
  },
  industrial: {
    floor: new THREE.MeshStandardMaterial({ color: 0x39454f, roughness: 0.88 }),
    wall: new THREE.MeshStandardMaterial({ color: 0x6f7d88, roughness: 0.8 }),
    cover: new THREE.MeshStandardMaterial({ color: 0x875d3b, roughness: 0.6 }),
    accent: new THREE.MeshStandardMaterial({ color: 0xd9862b, emissive: 0x261301 }),
  },
  desert: {
    floor: new THREE.MeshStandardMaterial({ color: 0xb58957, roughness: 1 }),
    wall: new THREE.MeshStandardMaterial({ color: 0xd3b184, roughness: 0.9 }),
    cover: new THREE.MeshStandardMaterial({ color: 0x8b5c2b, roughness: 0.65 }),
    accent: new THREE.MeshStandardMaterial({ color: 0x8eb0d0, emissive: 0x111111 }),
  },
};

export function buildLevel(scene, key) {
  const config = MAPS[key];
  const materials = materialSets[config.theme];
  const level = new THREE.Group();
  const colliders = [];
  const navPoints = [];
  const objectiveMeshes = [];

  const floor = new THREE.Mesh(new THREE.BoxGeometry(120, 2, 120), materials.floor);
  floor.position.set(0, -1, 0);
  floor.receiveShadow = true;
  level.add(floor);

  const addBox = (x, y, z, w, h, d, material = materials.wall, shadow = true) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    level.add(mesh);
    colliders.push({ minX: x - w / 2, maxX: x + w / 2, minY: y - h / 2, maxY: y + h / 2, minZ: z - d / 2, maxZ: z + d / 2, mesh });
    return mesh;
  };

  const addLaneLights = () => {
    [-30, 0, 30].forEach((x, index) => {
      const light = new THREE.PointLight(0xffffff, 0.9, 30, 2);
      light.position.set(x, 10, index % 2 === 0 ? -10 : 10);
      light.castShadow = true;
      level.add(light);
    });
  };

  addBox(0, 8, -59, 118, 16, 2);
  addBox(0, 8, 59, 118, 16, 2);
  addBox(-59, 8, 0, 2, 16, 118);
  addBox(59, 8, 0, 2, 16, 118);

  if (config.theme === 'urban') {
    addLaneLights();
    addBox(-16, 5, 0, 10, 10, 26);
    addBox(16, 5, 0, 10, 10, 26);
    addBox(0, 4, -26, 42, 8, 10);
    addBox(-32, 3, 12, 12, 6, 12, materials.cover);
    addBox(30, 3, -12, 10, 6, 14, materials.cover);
    addBox(-4, 3, 26, 18, 6, 10, materials.cover);
    addBox(34, 6, 18, 16, 12, 8);
    addBox(-36, 6, -20, 12, 12, 14);
    navPoints.push(new THREE.Vector3(-40, 0, 18), new THREE.Vector3(-18, 0, 20), new THREE.Vector3(0, 0, 20), new THREE.Vector3(18, 0, 18), new THREE.Vector3(34, 0, 10), new THREE.Vector3(-24, 0, -16), new THREE.Vector3(0, 0, -20), new THREE.Vector3(24, 0, -18));
  }

  if (config.theme === 'industrial') {
    addLaneLights();
    addBox(0, 6, 0, 14, 12, 40);
    addBox(-24, 4, 14, 18, 8, 12, materials.cover);
    addBox(24, 4, -14, 18, 8, 12, materials.cover);
    addBox(-14, 5, -24, 24, 10, 10);
    addBox(18, 5, 24, 20, 10, 10);
    addBox(-40, 4, 0, 10, 8, 20, materials.accent);
    addBox(40, 4, 0, 10, 8, 20, materials.accent);
    navPoints.push(new THREE.Vector3(-34, 0, -20), new THREE.Vector3(-16, 0, -8), new THREE.Vector3(0, 0, -8), new THREE.Vector3(16, 0, -18), new THREE.Vector3(26, 0, -24), new THREE.Vector3(-22, 0, 16), new THREE.Vector3(-4, 0, 18), new THREE.Vector3(18, 0, 18));
  }

  if (config.theme === 'desert') {
    const sun = new THREE.DirectionalLight(0xfff0c1, 1.4);
    sun.position.set(24, 40, 12);
    sun.castShadow = true;
    level.add(sun);
    addBox(0, 5, 0, 18, 10, 44);
    addBox(-22, 4, -18, 14, 8, 14, materials.cover);
    addBox(24, 4, 18, 16, 8, 16, materials.cover);
    addBox(-34, 6, 12, 18, 12, 10);
    addBox(36, 6, -12, 18, 12, 10);
    addBox(-6, 3, 30, 20, 6, 8, materials.cover);
    addBox(6, 3, -30, 20, 6, 8, materials.cover);
    navPoints.push(new THREE.Vector3(-40, 0, 10), new THREE.Vector3(-20, 0, 14), new THREE.Vector3(0, 0, 18), new THREE.Vector3(18, 0, 18), new THREE.Vector3(34, 0, 10), new THREE.Vector3(-28, 0, -12), new THREE.Vector3(0, 0, -18), new THREE.Vector3(28, 0, -10));
  }

  const markerMaterial = new THREE.MeshStandardMaterial({ color: 0x00d1a7, emissive: 0x003329 });
  const hostageMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x333333 });

  config.objectives.bombSites.forEach((site) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(site.radius, site.radius, 0.3, 32), markerMaterial);
    mesh.position.set(site.x, 0.16, site.z);
    mesh.receiveShadow = true;
    level.add(mesh);
    objectiveMeshes.push({ type: 'bomb', team: 'T', data: site, mesh });
  });

  config.objectives.hostages.forEach((hostage) => {
    const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(1, 2.8, 4, 8), hostageMaterial);
    mesh.position.set(hostage.x, 2, hostage.z);
    mesh.castShadow = true;
    level.add(mesh);
    objectiveMeshes.push({ type: 'hostage', team: 'CT', data: hostage, mesh, rescued: false });
  });

  config.objectives.rescueZones.forEach((zone) => {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(zone.radius * 0.78, 0.22, 12, 32), new THREE.MeshStandardMaterial({ color: 0x53adff, emissive: 0x09284a }));
    mesh.rotation.x = Math.PI / 2;
    mesh.position.set(zone.x, 0.2, zone.z);
    level.add(mesh);
    objectiveMeshes.push({ type: 'rescue', team: 'CT', data: zone, mesh });
  });

  scene.add(level);
  return { config, group: level, colliders, navPoints, objectiveMeshes };
}
