import { Matrix4 } from './Matrix4.js';

/**
 * Quaternion class
 * Represents a quaternion used for 3D rotations.
 */
class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.isValid = true;
    this.debugMode = false;
  }

  /**
   * Sets quaternion from axis-angle.
   */
  setFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2;
    const s = Math.sin(halfAngle);
    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos(halfAngle);

    if (this.debugMode) {
      console.log('[Quaternion] Set from axis-angle:', axis, angle);
    }
  }

  /**
   * Converts quaternion to Matrix4 rotation.
   */
  toMatrix4() {
    const m = new Matrix4();
    m.compose({ x: 0, y: 0, z: 0 }, this, { x: 1, y: 1, z: 1 });
    return m;
  }
}

export { Quaternion };
