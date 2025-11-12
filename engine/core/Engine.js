/**
 * Engine
 * --------------------------------------------------------------------
 * Role:
 * - Central orchestrator that wires Clock, Loop, Renderer, SceneManager,
 *   and InputManager together.
 *
 * Lifecycle:
 * - start(): starts the Clock and Loop.
 * - stop(): stops both.
 *
 * Integration:
 * - update(dt): where per-frame logic (animation, physics, scripts)
 *   would run. Currently a placeholder.
 * - render(): delegates to Renderer to draw the active scene.
 */
import { Clock } from './Clock.js';
import { Loop } from './Loop.js';
import { State } from './State.js';
import { Config } from './Config.js';
import { Scene } from '../scene/Scene.js';
import { SceneManager } from '../scene/SceneManager.js';
import { Renderer } from '../graphics/Renderer.js';
import { InputManager } from '../input/InputManager.js';

export class Engine {
  constructor(canvas) {
    this.state = new State();
    this.clock = new Clock();
    this.sceneManager = new SceneManager();
    this.renderer = new Renderer(canvas, Config.renderer);
    this.input = new InputManager(canvas);

    // Create a default scene and activate it
    const scene = new Scene('DefaultScene');
    this.sceneManager.setActive(scene);

    // Loop: bind clock tick, update, and render
    this.loop = new Loop(() => {
      const dt = this.clock.tick();
      if (dt <= 0) return;
      this.update(dt);
      this.render();
    });
  }

  start() {
    this.clock.start();
    this.loop.start();
  }

  stop() {
    this.loop.stop();
    this.clock.stop();
  }

  update(dt) {
    // Future systems: animations, physics, scripts, AI, etc.
    // This is intentionally simple for the initial scaffold.
    const scene = this.sceneManager.active;
    for (const e of scene.entities) {
      if (!e.active) continue;
      // Example hook: transform matrix would be updated here if dirty.
      // e.transform.updateMatrix();
    }
  }

  render() {
    const scene = this.sceneManager.active;
    this.renderer.render(scene);
  }
}
