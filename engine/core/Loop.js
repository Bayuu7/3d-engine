export class Loop {
  constructor(step){ this._step=step; this._id=null; this._running=false; }
  start(){ if (this._running) return; this._running=true; const run=()=>{ if (!this._running) return; this._step(); this._id=requestAnimationFrame(run); }; this._id=requestAnimationFrame(run); }
  stop(){ this._running=false; if (this._id) cancelAnimationFrame(this._id); this._id=null; }
}
