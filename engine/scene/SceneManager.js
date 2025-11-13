import { Scene } from './Scene.js';

/**
 * SceneManager class
 * Manages multiple scenes, handles activation, loading, and transitions.
 */
class SceneManager {
  constructor() {
    // Dictionary of scenes by name for quick lookup
    this.scenes = new Map();
    // Reference to the currently active scene
    this.activeScene = null;
    // Boolean flag: enable debug logs
    this.debugMode = false;
  }

  /**
   * Creates a new scene and registers it by name.
   */
  createScene(name) {
    // Instantiate a new Scene object
    const scene = new Scene(name);
    // Add to the scenes map
    this.scenes.set(name, scene);
    // Optionally log creation
    if (this.debugMode) {
      console.log('[SceneManager] Created scene:', name);
    }
    // Return the new scene for immediate use
    return scene;
  }

  /**
   * Sets a scene as the active one by name.
   */
  setActiveScene(name) {
    // Lookup the scene in the map
    const scene = this.scenes.get(name);
    // Throw if not found to avoid silent failures
    if (!scene) throw new Error(`Scene "${name}" not found`);
    // Deactivate the previous active scene if exists
    if (this.activeScene) this.activeScene.active = false;
    // Assign and activate the new scene
    this.activeScene = scene;
    this.activeScene.active = true;
    // Optionally log activation
    if (this.debugMode) {
      console.log('[SceneManager] Active scene set to:', name);
    }
  }

  /**
   * Updates only the active scene.
   * @param {number} delta - Time delta in seconds.
   */
  update(delta) {
    // If an active scene is set, update it
    if (this.activeScene) {
      this.activeScene.update(delta);
      // Optionally log update routing
      if (this.debugMode) {
        console.log('[SceneManager] Updated active scene with delta:', delta);
      }
    }
  }
}

export { SceneManager };
