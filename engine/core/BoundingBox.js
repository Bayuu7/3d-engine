// Import Vector3 because a bounding box works with 3D points
import { Vector3 } from './Vector3.js';

/**
 * BoundingBox class
 * Represents an axis-aligned bounding box (AABB).
 * Used in physics, raycasting, and scene culling.
 */
class BoundingBox {
  constructor(min = new Vector3(), max = new Vector3()) {
    // Minimum corner of the box (x, y, z)
    this.min = min;
    // Maximum corner of the box (x, y, z)
    this.max = max;

    // Boolean flag: indicates if the box is valid
    this.isValid = true;
    // Boolean flag: enables debug logging
    this.debugMode = false;
  }

  /**
   * Expands the bounding box to include a new point.
   * This is used when adding vertices of a mesh or updating physics bounds.
   */
  expandByPoint(point) {
    this.min.x = Math.min(this.min.x, point.x);
    this.min.y = Math.min(this.min.y, point.y);
    this.min.z = Math.min(this.min.z, point.z);

    this.max.x = Math.max(this.max.x, point.x);
    this.max.y = Math.max(this.max.y, point.y);
    this.max.z = Math.max(this.max.z, point.z);

    this.isValid = true;

    if (this.debugMode) {
      console.log('[BoundingBox] Expanded by point:', point);
    }
  }

  /**
   * Checks if a point is inside the bounding box.
   * Useful for hit detection and spatial queries.
   */
  containsPoint(point) {
    const inside =
      point.x >= this.min.x &&
      point.x <= this.max.x &&
      point.y >= this.min.y &&
      point.y <= this.max.y &&
      point.z >= this.min.z &&
      point.z <= this.max.z;

    if (this.debugMode) {
      console.log('[BoundingBox] Contains point?', inside);
    }

    return inside;
  }

  /**
   * Checks if another bounding box intersects with this one.
   * Used in collision detection and broadphase physics.
   */
  intersectsBox(box) {
    const intersects =
      this.max.x >= box.min.x &&
      this.min.x <= box.max.x &&
      this.max.y >= box.min.y &&
      this.min.y <= box.max.y &&
      this.max.z >= box.min.z &&
      this.min.z <= box.max.z;

    if (this.debugMode) {
      console.log('[BoundingBox] Intersects other box?', intersects);
    }

    return intersects;
  }
}

export { BoundingBox };
