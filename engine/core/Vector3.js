/**
 * Vector3
 * --------------------------------------------------------------------
 * Role:
 * - 3D vector representation with common operations.
 *
 * Design:
 * - Mutable for performance; return "this" for chainable operations.
 *
 * Integration:
 * - Used by Transform (position/rotation/scale), physics, camera, etc.
 */
export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x; this.y = y; this.z = z;
  }

  set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
  clone() { return new Vector3(this.x, this.y, this.z); }

  add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
  multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }

  length() { return Math.hypot(this.x, this.y, this.z); }
  normalize() {
    const l = this.length() || 1;
    this.x /= l; this.y /= l; this.z /= l; return this;
  }

  dot(v) { return this.x*v.x + this.y*v.y + this.z*v.z; }

  cross(v) {
    const x = this.y*v.z - this.z*v.y;
    const y = this.z*v.x - this.x*v.z;
    const z = this.x*v.y - this.y*v.x;
    this.x = x; this.y = y; this.z = z;
    return this;
  }
}
