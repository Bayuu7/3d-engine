/**
 * State class
 * Represents the current state of the engine (running, paused, stopped).
 * Used by Engine and Loop to control execution flow.
 */
class State {
  constructor() {
    // Boolean flag: engine is running
    this.running = false;
    // Boolean flag: engine is paused
    this.paused = false;
    // Boolean flag: engine is stopped
    this.stopped = true;
    // Debug flag
    this.debugMode = false;
  }

  /**
   * Sets the engine to running state.
   */
  setRunning() {
    this.running = true;
    this.paused = false;
    this.stopped = false;
    if (this.debugMode) {
      console.log('[State] Engine set to running');
    }
  }

  /**
   * Sets the engine to paused state.
   */
  setPaused() {
    this.running = false;
    this.paused = true;
    this.stopped = false;
    if (this.debugMode) {
      console.log('[State] Engine set to paused');
    }
  }

  /**
   * Sets the engine to stopped state.
   */
  setStopped() {
    this.running = false;
    this.paused = false;
    this.stopped = true;
    if (this.debugMode) {
      console.log('[State] Engine set to stopped');
    }
  }
}

export { State };
