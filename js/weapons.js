import { WEAPON_ORDER, WEAPONS } from './config.js';

export class WeaponSystem {
  constructor(owner) {
    this.owner = owner;
    this.inventory = Object.fromEntries(
      WEAPON_ORDER.map((key) => [key, { ...WEAPONS[key], ammo: WEAPONS[key].magazineSize, reserve: WEAPONS[key].reserveAmmo, cooldown: 0, reloadTimer: 0 }]),
    );
    this.activeKey = 'rifle';
  }

  get active() {
    return this.inventory[this.activeKey];
  }

  setWeaponByIndex(index) {
    if (WEAPON_ORDER[index]) this.activeKey = WEAPON_ORDER[index];
  }

  cycle(direction) {
    const current = WEAPON_ORDER.indexOf(this.activeKey);
    const next = (current + (direction > 0 ? 1 : -1) + WEAPON_ORDER.length) % WEAPON_ORDER.length;
    this.activeKey = WEAPON_ORDER[next];
  }

  update(delta) {
    Object.values(this.inventory).forEach((weapon) => {
      weapon.cooldown = Math.max(0, weapon.cooldown - delta);
      if (weapon.reloadTimer > 0) {
        weapon.reloadTimer = Math.max(0, weapon.reloadTimer - delta);
        if (weapon.reloadTimer === 0) {
          const needed = weapon.magazineSize - weapon.ammo;
          const transfer = Math.min(needed, weapon.reserve);
          weapon.ammo += transfer;
          weapon.reserve -= transfer;
        }
      }
    });
  }

  reload() {
    const weapon = this.active;
    if (weapon.reloadTimer > 0 || weapon.ammo === weapon.magazineSize || weapon.reserve <= 0) return false;
    weapon.reloadTimer = weapon.reloadTime;
    return true;
  }

  canFire() {
    const weapon = this.active;
    return weapon.cooldown === 0 && weapon.reloadTimer === 0 && weapon.ammo > 0;
  }

  fire() {
    const weapon = this.active;
    if (!this.canFire()) return null;
    weapon.ammo -= 1;
    weapon.cooldown = weapon.fireRate;
    return { ...weapon, key: this.activeKey };
  }
}
