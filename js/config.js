export const TEAM = {
  T: 'Terrorists',
  CT: 'Counter-Terrorists',
};

export const WEAPON_ORDER = ['pistol', 'rifle', 'sniper', 'grenade'];

export const WEAPONS = {
  pistol: {
    name: 'PX-9 Sidearm',
    type: 'pistol',
    magazineSize: 15,
    reserveAmmo: 60,
    damage: 24,
    fireRate: 0.22,
    reloadTime: 1.4,
    recoil: 0.9,
    spread: 0.009,
    pellets: 1,
    range: 70,
    adsFov: 62,
    speedMultiplier: 1,
  },
  rifle: {
    name: 'AR-24 Rifle',
    type: 'rifle',
    magazineSize: 30,
    reserveAmmo: 90,
    damage: 33,
    fireRate: 0.1,
    reloadTime: 2.2,
    recoil: 1.4,
    spread: 0.013,
    pellets: 1,
    range: 95,
    adsFov: 56,
    speedMultiplier: 0.95,
  },
  sniper: {
    name: 'M90 Marksman',
    type: 'sniper',
    magazineSize: 5,
    reserveAmmo: 25,
    damage: 90,
    fireRate: 1.1,
    reloadTime: 2.8,
    recoil: 3.5,
    spread: 0.002,
    pellets: 1,
    range: 140,
    adsFov: 28,
    speedMultiplier: 0.8,
  },
  grenade: {
    name: 'VX Fragmentation',
    type: 'grenade',
    magazineSize: 1,
    reserveAmmo: 2,
    damage: 75,
    fireRate: 0.9,
    reloadTime: 1.4,
    recoil: 0.2,
    spread: 0.04,
    pellets: 1,
    range: 10,
    adsFov: 68,
    speedMultiplier: 0.9,
  },
};

export const DIFFICULTIES = {
  recruit: { aim: 0.38, reaction: 0.5, aggression: 0.42, speed: 0.88 },
  veteran: { aim: 0.58, reaction: 0.8, aggression: 0.67, speed: 1 },
  elite: { aim: 0.8, reaction: 1.05, aggression: 0.9, speed: 1.08 },
};

export const MAPS = {
  urban: {
    name: 'Old Town Siege',
    theme: 'urban',
    fog: 0x111a2b,
    sky: 0x6e86a9,
    spawns: {
      T: { x: -42, y: 2.6, z: 26 },
      CT: { x: 42, y: 2.6, z: -26 },
    },
    objectives: {
      bombSites: [
        { name: 'A', x: 20, z: 20, radius: 6 },
        { name: 'B', x: -16, z: -20, radius: 6 },
      ],
      hostages: [
        { name: 'Hostage 1', x: 24, z: -8 },
        { name: 'Hostage 2', x: 30, z: -2 },
      ],
      rescueZones: [
        { name: 'Rescue', x: -40, z: -30, radius: 7 },
      ],
    },
  },
  industrial: {
    name: 'Dockyard Breach',
    theme: 'industrial',
    fog: 0x10151d,
    sky: 0x61727f,
    spawns: {
      T: { x: -36, y: 2.6, z: -28 },
      CT: { x: 38, y: 2.6, z: 24 },
    },
    objectives: {
      bombSites: [
        { name: 'A', x: -8, z: 18, radius: 6 },
        { name: 'B', x: 18, z: -18, radius: 6 },
      ],
      hostages: [
        { name: 'Hostage 1', x: 12, z: 18 },
        { name: 'Hostage 2', x: 18, z: 14 },
      ],
      rescueZones: [
        { name: 'Rescue', x: -34, z: 28, radius: 8 },
      ],
    },
  },
  desert: {
    name: 'Dust Frontier',
    theme: 'desert',
    fog: 0x4d3927,
    sky: 0xe5b66e,
    spawns: {
      T: { x: -44, y: 2.6, z: 18 },
      CT: { x: 40, y: 2.6, z: -18 },
    },
    objectives: {
      bombSites: [
        { name: 'A', x: -10, z: -18, radius: 7 },
        { name: 'B', x: 18, z: 20, radius: 7 },
      ],
      hostages: [
        { name: 'Hostage 1', x: 24, z: 4 },
        { name: 'Hostage 2', x: 28, z: 9 },
      ],
      rescueZones: [
        { name: 'Rescue', x: -42, z: -22, radius: 8 },
      ],
    },
  },
};
