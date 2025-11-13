export class Clock {
  constructor(){ this._last = 0; this._running=false; }
  start(){ this._last = performance.now(); this._running=true; }
  stop(){ this._running=false; }
  tick(){
    if (!this._running) this.start();
    const now = performance.now();
    const dt = (now - this._last) / 1000;
    this._last = now;
    return dt;
  }
}
