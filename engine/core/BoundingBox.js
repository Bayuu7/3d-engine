import { Vector3 } from './Vector3.js';

/**
 * BoundingBox class
 * Axis-aligned bounding box used across physics, raycasting, and scene culling.
 */
class BoundingBox {
  constructor(min = new Vector3(), max = new Vector3()) {
    this.min = min;
    this.max = max;

    this.isValid = true;     // Flag: box is valid
    this.debugMode = false;  // Flag: enable debug logging
  }

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
