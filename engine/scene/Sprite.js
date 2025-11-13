import { Entity } from './Entity.js';
import { Color } from '../core/Color.js';

/**
 * Sprite class (2D)
 * A renderable 2D entity with texture, color, and basic draw parameters.
 * Integrates with Renderer2D or a 2D render path.
 */
class Sprite extends Entity {
  constructor(name = 'Sprite') {
    // Call base entity constructor
    super(name);
    // Texture resource id or handle; renderer resolves actual GPU resource
    this.texture = null;
    // Base color tint applied during rendering
    this.color = new Color(1, 1, 1, 1);
    // Render layer or order for simple sorting
    this.layer = 0;
    // Boolean flag: visible state for renderer
    this.visible = true;
    // Debug flag
    this.debugMode = false;
  }

  /**
   * Sets the texture handle or resource id.
   */
  setTexture(tex) {
    // Assign texture handle
    this.texture = tex;
    // Optionally log assignment
    if (this.debugMode) {
      console.log(`[Sprite:${this.name}] Texture set`, tex);
    }
  }

  /**
   * Updates sprite per frame and invokes base entity updates.
   * @param {number} delta - Time delta in seconds.
   */
  onUpdate(delta) {
    // Update components and children
    super.update(delta);
    // Optionally log update
    if (this.debugMode) {
      console.log(`[Sprite:${this.name}] Updated with delta:`, delta);
    }
  }
}

export { Sprite };
