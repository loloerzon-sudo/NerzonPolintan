// Singleton AudioContext service with sound synth and visualizer state hooks
type AudioListener = (active: boolean) => void;

class AudioEngine {
  private static instance: AudioEngine;
  private ctx: AudioContext | null = null;
  private _sfxEnabled: boolean;
  private listeners: Set<AudioListener> = new Set();

  private constructor() {
    this._sfxEnabled = localStorage.getItem('sfx_enabled') !== 'false';
  }

  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) AudioEngine.instance = new AudioEngine();
    return AudioEngine.instance;
  }

  async init(): Promise<AudioContext | null> {
    if (!this.ctx) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    return this.ctx;
  }

  get sfxEnabled() { return this._sfxEnabled; }

  toggle(): boolean {
    this._sfxEnabled = !this._sfxEnabled;
    localStorage.setItem('sfx_enabled', this._sfxEnabled ? 'true' : 'false');
    this.notify(this._sfxEnabled);
    return this._sfxEnabled;
  }

  subscribe(fn: AudioListener) {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  private notify(active: boolean) {
    this.listeners.forEach(fn => fn(active));
  }

  private playTone(freq: number, type: OscillatorType, duration: number, gain = 0.08, slideTo?: number) {
    if (!this._sfxEnabled || !this.ctx) return;
    try {
      this.notify(true);
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
      gainNode.gain.setValueAtTime(gain, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
      setTimeout(() => this.notify(false), duration * 1000 + 50);
    } catch {}
  }

  click()   { this.playTone(680, 'sine', 0.045, 0.07, 340); }
  hover()   { this.playTone(1200, 'sine', 0.015, 0.02, 1600); }
  cmd()     { this.playTone(880, 'triangle', 0.05, 0.06, 440); }
  unfurl() {
    this.playTone(420, 'sine', 0.05, 0.05, 640);
    setTimeout(() => this.playTone(640, 'triangle', 0.08, 0.06, 880), 45);
  }
  success() {
    this.playTone(523.25, 'triangle', 0.08, 0.08);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.12, 0.09), 70);
  }
  fanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 'triangle', 0.12, 0.09), idx * 75);
    });
  }
  toggleSfx(on: boolean) {
    if (on) this.playTone(400, 'sine', 0.06, 0.07, 800);
    else this.playTone(800, 'sine', 0.06, 0.07, 300);
  }

  close() { this.ctx?.close(); this.ctx = null; }
}

export const audioEngine = AudioEngine.getInstance();
