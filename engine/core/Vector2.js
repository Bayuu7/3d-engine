/**
 * Vector2 class
 * Represents a 2D vector with x and y components.
 * Used in 2D graphics, physics, and UI.
 */
class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;

    this.isValid = true;
    this.debugMode = false;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    if (this.debugMode) {
      console.log('[Vector2] Added vector:', v);
    }
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    if (this.debugMode) {
      console.log('[Vector2] Subtracted vector:', v);
    }
    return this;
  }

  dot(v) {
    const result = this.x * v.x + this.y * v.y;
    if (this.debugMode) {
      console.log('[Vector2] Dot product:', result);
    }
    return result;
  }

  normalize() {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
    if (this.debugMode) {
      console.log('[Vector2] Normalized:', this);
    }
    return this;
  }
}

export { Vector2 };
