/**
 * Vector4 class
 * Represents a 4D vector with x, y, z, w components.
 * Used in homogeneous coordinates and advanced math.
 */
class Vector4 {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.isValid = true;
    this.debugMode = false;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    if (this.debugMode) {
      console.log('[Vector4] Added vector:', v);
    }
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    if (this.debugMode) {
      console.log('[Vector4] Subtracted vector:', v);
    }
    return this;
  }

  dot(v) {
    const result = this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    if (this.debugMode) {
      console.log('[Vector4] Dot product:', result);
    }
    return result;
  }

  normalize() {
    const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    if (length > 0) {
      this.x /= length;
      this.y /= length;
      this.z /= length;
      this.w /= length;
    }
    if (this.debugMode) {
      console.log('[Vector4] Normalized:', this);
    }
    return this;
  }
}

export { Vector4 };
