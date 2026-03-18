export class InputController {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.mouseDelta = { x: 0, y: 0 };
    this.isPointerLocked = false;
    this.fire = false;
    this.ads = false;
    this.scroll = 0;
    this.interact = false;
    this.reload = false;
    this.weaponSlot = null;
    this.bind();
  }

  bind() {
    document.addEventListener('keydown', (event) => {
      this.keys.add(event.code);
      if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(event.code)) {
        this.weaponSlot = Number(event.code.at(-1)) - 1;
      }
      if (event.code === 'KeyE') this.interact = true;
      if (event.code === 'KeyR') this.reload = true;
    });

    document.addEventListener('keyup', (event) => {
      this.keys.delete(event.code);
    });

    document.addEventListener('mousemove', (event) => {
      if (!this.isPointerLocked) return;
      this.mouseDelta.x += event.movementX;
      this.mouseDelta.y += event.movementY;
    });

    document.addEventListener('mousedown', (event) => {
      if (event.button === 0) this.fire = true;
      if (event.button === 2) this.ads = true;
    });

    document.addEventListener('mouseup', (event) => {
      if (event.button === 0) this.fire = false;
      if (event.button === 2) this.ads = false;
    });

    document.addEventListener('wheel', (event) => {
      this.scroll = Math.sign(event.deltaY);
    }, { passive: true });

    document.addEventListener('pointerlockchange', () => {
      this.isPointerLocked = document.pointerLockElement === this.canvas;
    });

    document.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  requestPointerLock() {
    this.canvas.requestPointerLock();
  }

  consumeFrameState() {
    const frameState = {
      keys: new Set(this.keys),
      mouseDelta: { ...this.mouseDelta },
      fire: this.fire,
      ads: this.ads,
      interact: this.interact,
      reload: this.reload,
      weaponSlot: this.weaponSlot,
      scroll: this.scroll,
    };

    this.mouseDelta.x = 0;
    this.mouseDelta.y = 0;
    this.interact = false;
    this.reload = false;
    this.weaponSlot = null;
    this.scroll = 0;
    return frameState;
  }
}
