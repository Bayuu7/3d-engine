import { Vector2 } from './Vector2.js';

/**
 * Matrix3 class
 * Represents a 3x3 matrix used for 2D transformations.
 * Commonly used for sprites, text, and UI elements.
 */
class Matrix3 {
  constructor() {
    // Elements stored in row-major order
    this.elements = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ];

    this.isValid = true;     // Flag: matrix is valid
    this.debugMode = false;  // Flag: enable debug logging
  }

  /**
   * Sets this matrix to identity.
   */
  identity() {
    this.elements = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ];
    if (this.debugMode) {
      console.log('[Matrix3] Set to identity');
    }
  }

  /**
   * Applies translation to the matrix.
   */
  translate(x, y) {
    this.elements[6] += x;
    this.elements[7] += y;
    if (this.debugMode) {
      console.log('[Matrix3] Translated by:', x, y);
    }
  }

  /**
   * Applies scaling to the matrix.
   */
  scale(sx, sy) {
    this.elements[0] *= sx;
    this.elements[4] *= sy;
    if (this.debugMode) {
      console.log('[Matrix3] Scaled by:', sx, sy);
    }
  }

  /**
   * Applies rotation (in radians).
   */
  rotate(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);

    const m0 = this.elements[0], m1 = this.elements[1];
    const m3 = this.elements[3], m4 = this.elements[4];

    this.elements[0] = c * m0 + s * m3;
    this.elements[1] = c * m1 + s * m4;
    this.elements[3] = -s * m0 + c * m3;
    this.elements[4] = -s * m1 + c * m4;

    if (this.debugMode) {
      console.log('[Matrix3] Rotated by:', theta, 'radians');
    }
  }

  /**
   * Applies this matrix to a Vector2.
   */
  applyToVector2(v) {
    const x = v.x, y = v.y;
    v.x = this.elements[0] * x + this.elements[3] * y + this.elements[6];
    v.y = this.elements[1] * x + this.elements[4] * y + this.elements[7];
    if (this.debugMode) {
      console.log('[Matrix3] Applied to Vector2:', v);
    }
    return v;
  }
}

export { Matrix3 };
      
