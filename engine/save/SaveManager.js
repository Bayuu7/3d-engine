import { Serializer } from './Serializer.js';

/**
 * SaveManager
 * --------------------------------------------------------------------
 * Role:
 * - Provides save/load functionality using localStorage.
 */
export class SaveManager {
  constructor(engine) {
    this.engine = engine;
  }

  saveScene(key = 'scene') {
    const scene = this.engine.sceneManager.active;
    const json = Serializer.serializeScene(scene);
    localStorage.setItem(key, json);
    console.log('Scene saved:', json);
  }

  async loadScene(key = 'scene') {
    const json = localStorage.getItem(key);
    if (!json) {
      console.warn('No scene saved under key', key);
      return;
    }
    await Serializer.deserializeScene(json, this.engine);
    console.log('Scene loaded');
  }
}
