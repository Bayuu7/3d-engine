/**
 * Loop
 * --------------------------------------------------------------------
 * Role:
 * - Drives the engine update/render pipeline using requestAnimationFrame.
 *
 * Design:
 * - Stores a tick function passed by the Engine.
 * - start()/stop() control an internal running flag and the RAF id.
 *
 * Integration:
 * - Engine constructs Loop with a tick callback that reads Clock delta,
 *   updates systems, and renders.
 */
export class Loop {
  constructor(tickFn) {
    this._tickFn = tickFn;
    this._running = false;
    this._rafId = null;
  }

  start() {
    if (this._running) return;
    this._running = true;
    const step = (time) => {
      if (!this._running) return;
      this._tickFn(time);
      this._rafId = requestAnimationFrame(step);
    };
    this._rafId = requestAnimationFrame(step);
  }

  stop() {
    this._running = false;
    if (this._rafId) cancelAnimationFrame(this._rafId);
    this._rafId = null;
  }
}
