/**
 * Animator
 * --------------------------------------------------------------------
 * Role:
 * - Holds multiple tracks, applies to entity over time.
 */
export class Animator {
  constructor() {
    this.tracks = []; // array of KeyframeTrack
    this.time = 0;
    this.playing = true;
    this.loop = true;
    this.length = 0; // max track time
  }

  addTrack(track) {
    this.tracks.push(track);
    this.length = Math.max(this.length, track.times[track.times.length-1] || 0);
    return track;
  }

  update(entity, dt) {
    if (!this.playing) return;
    this.time += dt;
    if (this.loop && this.length > 0) this.time = this.time % this.length;

    for (const tr of this.tracks) {
      const v = tr.evaluate(this.time);
      if (v == null) continue;
      // Apply to path
      const parts = tr.path.split('.');
      let obj = entity;
      for (let i=0;i<parts.length-1;i++) obj = obj[parts[i]];
      obj[parts[parts.length-1]] = v;
    }
    entity.transform.updateMatrix();
  }
}
