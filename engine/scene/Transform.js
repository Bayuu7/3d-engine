import { Vector3 } from '../core/Vector3.js';
import { Quaternion } from '../core/Quaternion.js';
import { Matrix4 } from '../core/Matrix4.js';

/**
 * Transform class
 * Holds position, rotation, and scale. Composes a Matrix4 for rendering and physics.
 * Integrates tightly with Entity and Scene graph traversal.
 */
class Transform {
  constructor() {
    // World position of the entity
    this.position = new Vector3(0, 0, 0);
    // Rotation of the entity as quaternion (to avoid gimbal lock)
    this.rotation = new Quaternion(0, 0, 0, 1);
    // Local scale of the entity
    this.scale = new Vector3(1, 1, 1);
    // Cached world matrix used by renderer and physics
    this.worldMatrix = new Matrix4();
    // Boolean flag: if true, worldMatrix needs recomputation
    this.dirty = true;
    // Boolean flag: enable debug logs
    this.debugMode = false;
  }

  /**
   * Marks this transform as dirty so it recomposes matrix on next access.
   */
  markDirty() {
    // Set dirty flag to true
    this.dirty = true;
    // Optionally log change if debugging
    if (this.debugMode) {
      console.log('[Transform] Marked dirty');
    }
  }

  /**
   * Sets position and marks transform dirty.
   */
  setPosition(x, y, z) {
    // Update position components
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    // Mark transform for recomposition
    this.markDirty();
  }

  /**
   * Sets uniform scale and marks transform dirty.
   */
  setUniformScale(s) {
    // Apply the same scale to all axes
    this.scale.x = s;
    this.scale.y = s;
    this.scale.z = s;
    // Mark transform for recomposition
    this.markDirty();
  }

  /**
   * Sets non-uniform scale and marks transform dirty.
   */
  setScale(x, y, z) {
    // Set different scales for each axis
    this.scale.x = x;
    this.scale.y = y;
    this.scale.z = z;
    // Mark transform for recomposition
    this.markDirty();
  }

  /**
   * Sets rotation from axis/angle (in radians) and marks transform dirty.
   */
  setRotationFromAxisAngle(axis, angle) {
    // Use quaternion method to set rotation safely
    this.rotation.setFromAxisAngle(axis, angle);
    // Mark transform for recomposition
    this.markDirty();
  }

  /**
   * Returns the world matrix, recomposing if dirty.
   */
  getMatrix() {
    // If transform changed, compose a new matrix
    if (this.dirty) {
      this.worldMatrix.compose(this.position, this.rotation, this.scale);
      // Reset dirty flag after recomposition
      this.dirty = false;
      // Optionally log recomposition when debugging
      if (this.debugMode) {
        console.log('[Transform] Composed world matrix');
      }
    }
    // Return cached matrix for efficiency
    return this.worldMatrix;
  }
}

export { Transform };
