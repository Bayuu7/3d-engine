/**
 * AudioEngine
 * --------------------------------------------------------------------
 * Role:
 * - Manages audio playback using Web Audio API.
 * - Supports loading sounds, playing, pausing, stopping.
 */
export class AudioEngine {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.buffers = new Map();
  }

  async loadSound(name, url) {
    const res = await fetch(url);
    const arr = await res.arrayBuffer();
    const buf = await this.ctx.decodeAudioData(arr);
    this.buffers.set(name, buf);
  }

  play(name, loop=false) {
    const buf = this.buffers.get(name);
    if (!buf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = loop;
    src.connect(this.ctx.destination);
    src.start();
    return src;
  }
}
