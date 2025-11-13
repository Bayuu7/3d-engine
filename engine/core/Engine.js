import { Loop } from './Loop.js';
import { Clock } from './Clock.js';
import { State } from './State.js';
import { Config } from './Config.js';

/**
 * Engine class
 * The main entry point for running the DSRT engine.
 * Manages the loop, state, and subsystems (physics, audio, rendering).
 */
class Engine {
  constructor(canvas) {
    // Canvas element for rendering
    this.canvas = canvas;

    // Core subsystems
    this.clock = new Clock(true);
    this.loop = new Loop(this);
    this.state = new State();

    // Boolean flag: engine is initialized
    this.initialized = false;
    // Boolean flag: engine is currently running
    this.running = false;
    // Boolean flag: enable debug logging
    this.debugMode = Config.debugMode;
  }

  /**
   * Initializes the engine.
   * Sets up rendering context and subsystems.
   */
  init() {
    this.initialized = true;
    if (this.debugMode) {
      console.log('[Engine] Initialized');
    }
  }

  /**
   * Starts the engine loop.
   */
  start() {
    if (!this.initialized) this.init();
    this.running = true;
    this.loop.start();
    if (this.debugMode) {
      console.log('[Engine] Started');
    }
  }

  /**
   * Stops the engine loop.
   */
  stop() {
    this.running = false;
    this.loop.stop();
    if (this.debugMode) {
      console.log('[Engine] Stopped');
    }
  }

  /**
   * Updates the engine state.
   * Called every frame by Loop.
   */
  update(delta) {
    if (this.debugMode) {
      console.log('[Engine] Update with delta:', delta);
    }
    // Update subsystems here (physics, scene, audio)
  }

  /**
   * Renders the current frame.
   * Called every frame by Loop.
   */
  render() {
    if (this.debugMode) {
      console.log('[Engine] Render frame');
    }
    // Rendering logic goes here
  }
}

export { Engine };
