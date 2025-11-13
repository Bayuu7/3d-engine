import { Entity } from './Entity.js';

/**
 * UIElement class
 * A 2D UI entity (button, panel, slider) with basic layout properties.
 * Integrates with UI system and renderer overlays.
 */
class UIElement extends Entity {
  constructor(name = 'UIElement') {
    // Call base entity constructor
    super(name);
    // Width and height in pixels (basic layout attributes)
    this.width = 100;
    this.height = 50;
    // Anchor position (e.g., 'top-left', 'center', etc.)
    this.anchor = 'top-left';
    // Visibility flag for UI renderer
    this.visible = true;
    // Interactable flag for input system
    this.interactable = true;
    // Debug flag
    this.debugMode = false;
  }

  /**
   * Sets size and marks layout dirty (renderer/UI system decides draw bounds).
   */
  setSize(w, h) {
    // Update dimensions
    this.width = w;
    this.height = h;
    // Optionally log size change
    if (this.debugMode) {
      console.log(`[UIElement:${this.name}] Size set to ${w}x${h}`);
    }
  }

  /**
   * Updates per frame and invokes base entity updates.
   * @param {number} delta - Time delta in seconds.
   */
  onUpdate(delta) {
    // Update components and children
    super.update(delta);
    // Optionally log update
    if (this.debugMode) {
      console.log(`[UIElement:${this.name}] Updated with delta:`, delta);
    }
  }
}

export { UIElement };
