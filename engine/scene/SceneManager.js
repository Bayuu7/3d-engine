import { EventEmitter } from '../core/EventEmitter.js';

export class SceneManager {
  constructor() {
    this.events = new EventEmitter();
    this._active = null;
  }
  setActive(scene) {
    this._active = scene;
    this.events.emit('scene:changed', { scene });
  }
  get active() { return this._active; }
}
