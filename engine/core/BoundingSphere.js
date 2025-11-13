// Import Vector3 because a sphere needs a center point
import { Vector3 } from './Vector3.js';

/**
 * BoundingSphere class
 * Represents a sphere used for collision detection and spatial queries.
 */
class BoundingSphere {
  constructor(center = new Vector3(), radius = 1) {
    // Center of the sphere
    this.center = center;
    // Radius of the sphere
    this.radius = radius;

    // Boolean flag: indicates if the sphere is valid
    this.isValid = true;
    // Boolean flag: enables debug logging
    this.debugMode = false;
  }

  /**
   * Checks if a point is inside the sphere.
   * Useful for quick hit tests.
   */
  containsPoint(point) {
    const dx = point.x - this.center.x;
    const dy = point.y - this.center.y;
    const dz = point.z - this.center.z;
    const distanceSq = dx * dx + dy * dy + dz * dz;

    const inside = distanceSq <= this.radius * this.radius;

    if (this.debugMode) {
      console.log('[BoundingSphere] Contains point?', inside);
    }

    return inside;
  }

  /**
   * Checks if another sphere intersects with this one.
   * Used in broadphase collision detection.
   */
  intersectsSphere(sphere) {
    const dx = sphere.center.x - this.center.x;
    const dy = sphere.center.y - this.center.y;
    const dz = sphere.center.z - this.center.z;
    const distanceSq = dx * dx + dy * dy + dz * dz;

    const radiusSum = this.radius + sphere.radius;
    const intersects = distanceSq <= radiusSum * radiusSum;

    if (this.debugMode) {
      console.log('[BoundingSphere] Intersects other sphere?', intersects);
    }

    return intersects;
  }
}

export { BoundingSphere };
