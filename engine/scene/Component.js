/**
 * Component base class
 * Attach components to Entities to extend behavior (e.g., Renderable, PhysicsBody, Script).
 * Provides lifecycle hooks and a clean integration pattern with Entity and SceneManager.
 */
class Component {
  constructor() {
    // Boolean flag: whether this component is currently enabled and will update
    this.enabled = true;
    // Boolean flag: whether this component is initialized (after onInit lifecycle)
    this.initialized = false;
    // Reference to the parent entity; set when added to an Entity
    this.entity = null;
    // Debug flag for verbose logging
    this.debugMode = false;
  }

  /**
   * Called once when the component is added to an entity and initialized.
   */
  onInit() {
    // Mark component as initialized
    this.initialized = true;
    // Optionally log if debugMode is enabled
    if (this.debugMode) {
      console.log('[Component] Initialized', this.constructor.name);
    }
  }

  /**
   * Called every frame by the entity when enabled.
   * @param {number} delta - Time delta in seconds from the engine loop.
   */
  onUpdate(delta) {
    // Default implementation does nothing; derived classes implement logic
    if (this.debugMode) {
      console.log('[Component] onUpdate called', this.constructor.name, delta);
    }
  }

  /**
   * Called when the component is removed from the entity or the entity is destroyed.
   */
  onDestroy() {
    // Cleanup resources, unsubscribe events, null references if needed
    if (this.debugMode) {
      console.log('[Component] Destroyed', this.constructor.name);
    }
  }
}

export { Componen
        t };
