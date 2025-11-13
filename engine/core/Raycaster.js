import { Ray } from './Ray.js';
import { BoundingBox } from './BoundingBox.js';
import { BoundingSphere } from './BoundingSphere.js';

/**
 * Raycaster class
 * Casts rays into the scene to detect intersections.
 */
class Raycaster {
  constructor(ray = new Ray()) {
    this.ray = ray;

    this.isActive = true;
    this.debugMode = false;
  }

  /**
   * Tests intersection with a bounding box.
   */
  intersectsBox(box) {
    const inside = box.containsPoint(this.ray.origin) || box.intersectsBox(box);
    if (this.debugMode) {
      console.log('[Raycaster] Intersects box?', inside);
    }
    return inside;
  }

  /**
   * Tests intersection with a bounding sphere.
   */
  intersectsSphere(sphere) {
    const inside = sphere.containsPoint(this.ray.origin) || sphere.intersectsSphere(sphere);
    if (this.debugMode) {
      console.log('[Raycaster] Intersects sphere?', inside);
    }
    return inside;
  }
}

export { Raycaster };
