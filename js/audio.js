export class AudioEngine {
  constructor() {
    this.context = null;
  }

  ensureContext() {
    if (!this.context) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.context = AudioCtx ? new AudioCtx() : null;
    }
    if (this.context && this.context.state === 'suspended') {
      this.context.resume();
    }
    return this.context;
  }

  tone({ frequency = 440, duration = 0.08, type = 'sawtooth', gain = 0.03, attack = 0.002, pan = 0 }) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    const panner = ctx.createStereoPanner();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(60, frequency * 0.7), now + duration);

    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.linearRampToValueAtTime(gain, now + attack);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    panner.pan.value = pan;
    oscillator.connect(envelope).connect(panner).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  playShot(weaponType = 'rifle') {
    const presets = {
      pistol: { frequency: 320, duration: 0.08, gain: 0.04 },
      rifle: { frequency: 190, duration: 0.12, gain: 0.06 },
      sniper: { frequency: 120, duration: 0.16, gain: 0.08 },
      grenade: { frequency: 160, duration: 0.2, gain: 0.06 },
    };
    this.tone({ type: 'square', ...presets[weaponType] });
  }

  playReload() {
    this.tone({ frequency: 520, duration: 0.05, type: 'triangle', gain: 0.025, pan: -0.2 });
    setTimeout(() => this.tone({ frequency: 660, duration: 0.07, type: 'triangle', gain: 0.025, pan: 0.2 }), 80);
  }

  playFootstep(speed = 1) {
    this.tone({ frequency: 90 + Math.random() * 20, duration: 0.03, type: 'triangle', gain: 0.012 * speed });
  }

  playExplosion() {
    this.tone({ frequency: 75, duration: 0.45, type: 'sawtooth', gain: 0.09 });
  }

  playObjective() {
    this.tone({ frequency: 740, duration: 0.09, type: 'sine', gain: 0.035 });
    setTimeout(() => this.tone({ frequency: 920, duration: 0.12, type: 'sine', gain: 0.03 }), 120);
  }
}
