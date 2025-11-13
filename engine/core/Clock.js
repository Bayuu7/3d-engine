/**
 * Clock class
 * Provides timing functionality for the engine loop.
 * Used to calculate delta time between frames.
 */
class Clock {
  constructor(autoStart = true) {
    // Boolean flag: whether the clock starts automatically
    this.autoStart = autoStart;
    // Boolean flag: whether the clock is currently running
    this.running = false;
    // Last recorded time
    this.lastTime = 0;
    // Accumulated elapsed time
    this.elapsedTime = 0;
    // Delta time between frames
    this.delta = 0;
    // Debug flag
    this.debugMode = false;

    if (this.autoStart) {
      this.start();
    }
  }

  /**
   * Starts the clock.
   */
  start() {
    this.running = true;
    this.lastTime = performance.now();
    if (this.debugMode) {
      console.log('[Clock] Started at', this.lastTime);
    }
  }

  /**
   * Stops the clock.
   */
  stop() {
    this.running = false;
    if (this.debugMode) {
      console.log('[Clock] Stopped');
    }
  }

  /**
   * Gets the time difference since the last call.
   * Updates delta and elapsed time.
   */
  getDelta() {
    if (!this.running) {
      if (this.autoStart) this.start();
      return 0;
    }

    const now = performance.now();
    this.delta = (now - this.lastTime) / 1000; // convert ms to seconds
    this.lastTime = now;
    this.elapsedTime += this.delta;

    if (this.debugMode) {
      console.log('[Clock] Delta:', this.delta, 'Elapsed:', this.elapsedTime);
    }

    return this.delta;
  }
}

export { Clock };
