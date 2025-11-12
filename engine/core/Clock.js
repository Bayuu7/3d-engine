/**
 * Clock
 * --------------------------------------------------------------------
 * Role:
 * - Central timekeeper used by the engine render/update loop.
 * - Computes delta time (seconds between frames) and elapsed time
 *   (seconds since clock start).
 *
 * Design notes:
 * - Uses performance.now() to ensure high-resolution timing on the web.
 * - Includes pause/resume semantics by controlling the running flag.
 * - Delta is clamped to avoid huge steps (e.g., when tab is hidden).
 *
 * Integration:
 * - Engine owns a Clock and calls clock.tick() inside Loop.
 * - The computed delta is passed to Engine.update(dt).
 */
export class Clock {
  constructor() {
    /** Internal start timestamp in ms since page load. */
    this._start = 0;
    /** Internal previous frame timestamp. */
    this._prev = 0;
    /** Public delta in seconds for the last frame. */
    this.delta = 0;
    /** Public elapsed in seconds since start was called. */
    this.elapsed = 0;
    /** Running flag controlling tick behavior. */
    this._running = false;
  }

  /** Starts the clock and resets internal state. */
  start() {
    this._start = performance.now();
    this._prev = this._start;
    this.elapsed = 0;
    this.delta = 0;
    this._running = true;
  }

  /** Stops the clock; tick() will return 0 while stopped. */
  stop() {
    this._running = false;
  }

  /**
   * Advances the clock and computes delta/elapsed.
   * Returns delta time in seconds; returns 0 when not running.
   */
  tick() {
    if (!this._running) return 0;
    const now = performance.now();
    const d = (now - this._prev) / 1000;
    // Clamp delta to keep updates numerically stable.
    this.delta = Math.min(Math.max(d, 0), 0.25);
    this.elapsed = (now - this._start) / 1000;
    this._prev = now;
    return this.delta;
  }
}
