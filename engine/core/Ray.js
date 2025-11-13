import { Vector3 } from './Vector3.js';

/**
 * Ray class
 * Represents a ray with origin and direction.
 * Used in raycasting and physics queries.
 */
class Ray {
  constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) {
    this.origin = origin;
    this.direction = direction;

    this.isValid = true;
    this.debugMode = false;
  }

  /**
   * Gets a point along the ray at distance t.
   */
  at(t) {
    return new Vector3(
      this.origin.x + this.direction.x * t,
      this.origin.y + this.direction.y * t,
      this.origin.z + this.direction.z * t
    );
  }
}

export { Ra
        y };
