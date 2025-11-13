import { Entity } from './Entity.js';

/**
 * Scene class
 * Holds a collection of root entities and manages hierarchical graph traversal.
 * Integrates with SceneManager for creation, loading, and active scene control.
 */
class Scene {
  constructor(name = 'Scene') {
    // Human-readable name of this scene
    this.name = name;
    // Root entities (top-level nodes with no parent)
    this.roots = [];
    // Boolean flag: whether the scene is currently active
    this.active = false;
    // Boolean flag: debug logging
    this.debugMode = false;
  }

  /**
   * Adds a root entity to the scene.
   */
  add(entity) {
    // Ensure an Entity instance is provided
    if (!(entity instanceof Entity)) {
      throw new Error('Scene.add requires an Entity instance');
    }
    // Push into roots list
    this.roots.push(entity);
    // Optionally log addition
    if (this.debugMode) {
      console.log(`[Scene:${this.name}] Added root entity: ${entity.name}`);
    }
  }

  /**
   * Removes a root entity from the scene.
   */
  remove(entity) {
    // Filter out the entity from roots
    this.roots = this.roots.filter(e => e !== entity);
    // Optionally log removal
    if (this.debugMode) {
      console.log(`[Scene:${this.name}] Removed root entity: ${entity.name}`);
    }
  }

  /**
   * Updates all root entities recursively.
   * @param {number} delta - Time delta in seconds.
   */
  update(delta) {
    // Skip update if inactive
    if (!this.active) return;
    // Update each root entity; they cascade updates to children/components
    for (const root of this.roots) {
      root.update(delta);
    }
    // Optionally log update pass
    if (this.debugMode) {
      console.log(`[Scene:${this.name}] Updated with delta:`, delta);
    }
  }
}

export { Scene };
