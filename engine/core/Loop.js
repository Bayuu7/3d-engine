import { Clock } from './Clock.js';
import { Config } from './Config.js';

/**
 * Loop class
 * Manages the main update/render loop of the engine.
 */
class Loop {
  constructor(engine) {
    this.engine = engine;
    this.clock = new Clock(true);

    // Boolean flag: loop is running
    this.running = false;
    // Boolean flag: enable debug logging
    this.debugMode = Config.debugMode;

    // Target FPS limiter
    this.targetFPS = Config.targetFPS;
    this.frameInterval = 1000 / this.targetFPS;
    this.lastFrameTime = 0;
  }

  /**
   * Starts the loop.
   */
  start() {
    this.running = true;
    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.tick.bind(this));

    if (this.debugMode) {
      console.log('[Loop] Started');
    }
  }

  /**
   * Stops the loop.
   */
  stop() {
    this.running = false;
    if (this.debugMode) {
      console.log('[Loop] Stopped');
    }
  }

  /**
   * Main tick function called every frame.
   */
  tick(now) {
    if (!this.running) return;

    const delta = this.clock.getDelta();

    // Frame limiter: only update/render if enough time has passed
    if (now - this.lastFrameTime >= this.frameInterval) {
      this.engine.update(delta);
      this.engine.render();
      this.lastFrameTime = now;
    }

    requestAnimationFrame(this.tick.bind(this));
  }
}

export { Loop };
