import { Vector3 } from './Vector3.js';
import { Quaternion } from './Quaternion.js';

/**
 * Matrix4 class
 * Represents a 4x4 matrix used for 3D transformations.
 * Commonly used for entities, cameras, and lights.
 */
class Matrix4 {
  constructor() {
    // Elements stored in row-major order
    this.elements = new Float32Array(16);
    this.identity();

    this.isValid = true;
    this.debugMode = false;
  }

  identity() {
    this.elements.set([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
    if (this.debugMode) {
      console.log('[Matrix4] Set to identity');
    }
  }

  /**
   * Composes a transformation from position, quaternion rotation, and scale.
   */
  compose(position, quaternion, scale) {
    const x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;

    const sx = scale.x, sy = scale.y, sz = scale.z;

    const e = this.elements;

    e[0] = (1 - (yy + zz)) * sx;
    e[1] = (xy + wz) * sx;
    e[2] = (xz - wy) * sx;
    e[3] = 0;

    e[4] = (xy - wz) * sy;
    e[5] = (1 - (xx + zz)) * sy;
    e[6] = (yz + wx) * sy;
    e[7] = 0;

    e[8] = (xz + wy) * sz;
    e[9] = (yz - wx) * sz;
    e[10] = (1 - (xx + yy)) * sz;
    e[11] = 0;

    e[12] = position.x;
    e[13] = position.y;
    e[14] = position.z;
    e[15] = 1;

    if (this.debugMode) {
      console.log('[Matrix4] Composed from position, quaternion, scale');
    }
  }
}

export { Matrix4 };
