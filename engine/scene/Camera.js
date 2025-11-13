import { Entity } from './Entity.js';
import { Vector3 } from '../core/Vector3.js';
import { Matrix4 } from '../core/Matrix4.js';

/**
 * Camera class
 * A specialized Entity that provides view and projection matrices.
 * Integrates with renderer to set the viewpoint for scene rendering.
 */
class Camera extends Entity {
  constructor(name = 'Camera') {
    // Call base Entity constructor
    super(name);
    // Field of view in degrees (vertical)
    this.fov = 60;
    // Near and far clipping planes for projection
    this.near = 0.1;
    this.far = 1000;
    // Aspect ratio width/height; can be set by renderer/viewport
    this.aspect = 16 / 9;
    // Cached view matrix (from inverse of world transform)
    this.viewMatrix = new Matrix4();
    // Cached projection matrix derived from fov/aspect/near/far
    this.projectionMatrix = new Matrix4();
    // Boolean flag: recompute matrices when transform or params change
    this.dirty = true;
    // Debug flag
    this.debugMode = false;
  }

  /**
   * Marks camera matrices as dirty to recompute next frame.
   */
  markDirty() {
    // Set dirty flag so matrices are recomputed
    this.dirty = true;
    // Optionally log change
    if (this.debugMode) {
      console.log(`[Camera:${this.name}] Marked dirty`);
    }
  }

  /**
   * Sets camera parameters (fov/near/far/aspect) and marks dirty.
   */
  setParams({ fov = this.fov, near = this.near, far = this.far, aspect = this.aspect } = {}) {
    // Update projection parameters
    this.fov = fov;
    this.near = near;
    this.far = far;
    this.aspect = aspect;
    // Mark matrices to be recomputed
    this.markDirty();
  }

  /**
   * Recomputes view and projection matrices if dirty.
   * Note: For simplicity, we assume renderer or math utils will provide inversion and perspective.
   */
  computeMatrices() {
    // If nothing changed, skip recomputation
    if (!this.dirty) return;

    // Compute projection matrix (placeholder: you may replace with a proper perspective function)
    const f = 1.0 / Math.tan((this.fov * Math.PI / 180) / 2);
    const e = this.projectionMatrix.elements;
    e[0] = f / this.aspect; e[1] = 0; e[2] = 0; e[3] = 0;
    e[4] = 0; e[5] = f; e[6] = 0; e[7] = 0;
    e[8] = 0; e[9] = 0; e[10] = (this.far + this.near) / (this.near - this.far); e[11] = -1;
    e[12] = 0; e[13] = 0; e[14] = (2 * this.far * this.near) / (this.near - this.far); e[15] = 0;

    // View matrix: for brevity, we reuse world matrix and expect renderer to invert it
    const world = this.transform.getMatrix();
    this.viewMatrix = world; // Replace with an actual inverse in your math lib

    // Reset dirty flag after recomputation
    this.dirty = false;

    // Optionally log recomputation
    if (this.debugMode) {
      console.log(`[Camera:${this.name}] Matrices computed`);
    }
  }

  /**
   * Updates camera state per frame.
   * @param {number} delta - Time delta in seconds.
   */
  onUpdate(delta) {
    // Recompute matrices if needed
    this.computeMatrices();
    // Call base entity update to update components/children
    super.update(delta);
    // Optionally log update
    if (this.debugMode) {
      console.log(`[Camera:${this.name}] Updated with delta:`, delta);
    }
  }
}

export { Camera };
