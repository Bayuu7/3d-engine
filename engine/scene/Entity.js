import { Transform } from './Transform.js';
import { Component } from './Component.js';

/**
 * Entity class
 * Fundamental scene object with a Transform and an extensible Component system.
 * Used by Scene to build a graph of objects (nodes, cameras, lights, sprites).
 */
class Entity {
  constructor(name = 'Entity') {
    // Human-readable identifier for debug and editor
    this.name = name;
    // Core transform (position, rotation, scale, world matrix)
    this.transform = new Transform();
    // Component list for behavior and features
    this.components = [];
    // Parent reference for hierarchical scenes
    this.parent = null;
    // Children array to form a scene graph
    this.children = [];
    // Boolean flag: whether this entity is active (will update and render)
    this.active = true;
    // Boolean flag: enable debug logs
    this.debugMode = false;
  }

  /**
   * Adds a child entity and sets its parent reference.
   */
  addChild(child) {
    // Push child into children array
    this.children.push(child);
    // Set child's parent to this entity
    child.parent = this;
    // Optionally log link when debugging
    if (this.debugMode) {
      console.log(`[Entity:${this.name}] Added child: ${child.name}`);
    }
  }

  /**
   * Removes a child entity from this entity.
   */
  removeChild(child) {
    // Filter out the target child
    this.children = this.children.filter(c => c !== child);
    // Clear its parent pointer
    if (child.parent === this) child.parent = null;
    // Optionally log unlink when debugging
    if (this.debugMode) {
      console.log(`[Entity:${this.name}] Removed child: ${child.name}`);
    }
  }

  /**
   * Adds a component to this entity and initializes it.
   */
  addComponent(component) {
    // Ensure the component is a proper instance of Component
    if (!(component instanceof Component)) {
      throw new Error('addComponent requires a Component instance');
    }
    // Push into the component array
    this.components.push(component);
    // Set back-reference so component can access entity/transform
    component.entity = this;
    // Call lifecycle init; component can subscribe to events or allocate resources
    component.onInit();
    // Optionally log attachment when debugging
    if (this.debugMode) {
      console.log(`[Entity:${this.name}] Component added: ${component.constructor.name}`);
    }
    // Return this for chaining
    return this;
  }

  /**
   * Removes a component and calls its destroy hook.
   */
  removeComponent(component) {
    // Filter components to remove the target instance
    this.components = this.components.filter(c => c !== component);
    // Call lifecycle destroy; component should free resources
    component.onDestroy();
    // Clear parent reference
    component.entity = null;
    // Optionally log removal when debugging
    if (this.debugMode) {
      console.log(`[Entity:${this.name}] Component removed: ${component.constructor.name}`);
    }
  }

  /**
   * Updates this entity and all its components and children.
   * @param {number} delta - Time delta in seconds.
   */
  update(delta) {
    // If inactive, skip updating for performance
    if (!this.active) return;
    // Update all enabled components
    for (const c of this.components) {
      if (c.enabled) c.onUpdate(delta);
    }
    // Recursively update children
    for (const child of this.children) {
      child.update(delta);
    }
    // Optionally log update when debugging
    if (this.debugMode) {
      console.log(`[Entity:${this.name}] Updated with delta:`, delta);
    }
  }
}

export { En
        tity };
