/**
 * SceneManager
 * --------------------------------------------------------------------
 * Role:
 * - Tracks the currently active scene and emits events on changes.
 *
 * Integration:
 * - Engine uses SceneManager to get the active scene for update/render.
 * - Frontend listens to 'scene:changed' and custom UI events on this bus.
 */
import { EventEmitter } from '../utils/EventEmitter.js';

export class SceneManager {
  constructor() {
    this.events = new EventEmitter();
    /** Internal reference to active Scene. */
    this._active = null;
  }

  /** Sets the active scene and emits a change event. */
  setActive(scene) {
    this._active = scene;
    this.events.emit('scene:changed', { scene });
  }

  /** Returns the active scene. */
  get active() {
    return this._active;
  }
}
