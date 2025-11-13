/**
 * Vector3 class
 * Represents a 3D vector with x, y, z components.
 * Used in 3D graphics, physics, and transformations.
 */
class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.isValid = true;
    this.debugMode = false;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    if (this.debugMode) {
      console.log('[Vector3] Added vector:', v);
    }
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    if (this.debugMode) {
      console.log('[Vector3] Subtracted vector:', v);
    }
    return this;
  }

  dot(v) {
    const result = this.x * v.x + this.y * v.y + this.z * v.z;
    if (this.debugMode) {
      console.log('[Vector3] Dot product:', result);
    }
    return result;
  }

  cross(v) {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    const result = new Vector3(x, y, z);
    if (this.debugMode) {
      console.log('[Vector3] Cross product:', result);
    }
    return result;
  }

  normalize() {
    const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if (length > 0) {
      this.x /= length;
      this.y /= length;
      this.z /= length;
    }
    if (this.debugMode) {
      console.log('[Vector3] Normalized:', this);
    }
    return this;
  }
}

export { Vector3 };
