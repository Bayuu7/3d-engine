import { Entity } from './Entity.js';
import { Color } from '../core/Color.js';

/**
 * Text class (2D)
 * A renderable 2D text entity with font, content, color, and alignment.
 * Integrates with Renderer2D or UI text pipeline.
 */
class Text extends Entity {
  constructor(name = 'Text') {
    // Call base entity constructor
    super(name);
    // Text content to render
    this.content = '';
    // Font resource id or handle
    this.font = null;
    // Color of the text
    this.color = new Color(1, 1, 1, 1);
    // Size in pixels; renderer resolves scaling
    this.size = 16;
    // Alignment options (left, center, right)
    this.align = 'left';
    // Boolean flag: visibility for renderer
    this.visible = true;
    // Debug flag
    this.debugMode = false;
  }

  /**
   * Sets text content and marks entity for redraw (renderer-specific).
   */
  setText(str) {
    // Update content property
    this.content = str;
    // Optionally log change
    if (this.debugMode) {
      console.log(`[Text:${this.name}] Content set`, str);
    }
  }

  /**
   * Updates text entity per frame and invokes base entity updates.
   * @param {number} delta - Time delta in seconds.
   */
  onUpdate(delta) {
    // Update components and children
    super.update(delta);
    // Optionally log update
    if (this.debugMode) {
      console.log(`[Text:${this.name}] Updated with delta:`, delta);
    }
  }
}

export { Text };
