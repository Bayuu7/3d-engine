import { Entity } from './Entity.js';
import { Color } from '../core/Color.js';

/**
 * Light class
 * A scene entity that emits light; used by renderer to shade objects.
 * Different types can be represented via the 'type' string (e.g., 'directional', 'point', 'spot').
 */
class Light extends Entity {
  constructor(name = 'Light', type = 'directional') {
    // Call base entity constructor
    super(name);
    // Type of the light for renderer interpretation
    this.type = type;
    // Base color/intensity of the light
    this.color = new Color(1, 1, 1, 1);
    this.intensity = 1.0;
    // Range (used by point/spot), optional depending on type
    this.range = 10.0;
    // Boolean flag: whether the light affects the scene
    this.enabled = true;
    // Debug flag
    this.debugMode = false;
  }

  /**
   * Enables or disables the light.
   */
  setEnabled(enabled) {
    // Update enabled flag
    this.enabled = enabled;
    // Optionally log change
    if (this.debugMode) {
      console.log(`[Light:${this.name}] Enabled set to:`, enabled);
    }
  }

  /**
   * Updates the light per frame (if needed).
   * @param {number} delta - Time delta in seconds.
   */
  onUpdate(delta) {
    // For most lights, per-frame updates may be minimal
    super.update(delta);
    // Optionally log update
    if (this.debugMode) {
      console.log(`[Light:${this.name}] Updated with delta:`, delta);
    }
  }
}

export { Ligh
        t };
