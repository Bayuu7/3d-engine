/**
 * KeyframeTrack
 * --------------------------------------------------------------------
 * Role:
 * - Stores keyframes for a single property (e.g., transform.position.x).
 * - Linear interpolation.
 */
export class KeyframeTrack {
  constructor(path, times=[], values=[]) {
    this.path = path; // e.g., 'transform.position.x'
    this.times = times; // [t0, t1, ...]
    this.values = values; // [v0, v1, ...]
  }

  evaluate(time) {
    if (this.times.length === 0) return null;
    if (time <= this.times[0]) return this.values[0];
    if (time >= this.times[this.times.length-1]) return this.values[this.values.length-1];
    // find segment
    let i = 0;
    while (i < this.times.length-1 && time > this.times[i+1]) i++;
    const t0 = this.times[i], t1 = this.times[i+1];
    const v0 = this.values[i], v1 = this.values[i+1];
    const alpha = (time - t0) / (t1 - t0);
    return v0*(1-alpha) + v1*alpha;
  }
}
