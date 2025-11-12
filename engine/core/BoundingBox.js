/**
 * BoundingBox
 * --------------------------------------------------------------------
 * Role:
 * - Axis-aligned bounding box (AABB).
 * - Used for collision detection and visibility culling.
 */
import { Vector3 } from './Vector3.js';

export class BoundingBox {
  constructor(min=new Vector3(+Infinity,+Infinity,+Infinity), max=new Vector3(-Infinity,-Infinity,-Infinity)) {
    this.min=min; this.max=max;
  }

  setFromPoints(points) {
    this.min.set(+Infinity,+Infinity,+Infinity);
    this.max.set(-Infinity,-Infinity,-Infinity);
    for (const p of points) {
      this.min.x=Math.min(this.min.x,p.x);
      this.min.y=Math.min(this.min.y,p.y);
      this.min.z=Math.min(this.min.z,p.z);
      this.max.x=Math.max(this.max.x,p.x);
      this.max.y=Math.max(this.max.y,p.y);
      this.max.z=Math.max(this.max.z,p.z);
    }
    return this;
  }

  containsPoint(p) {
    return (p.x>=this.min.x && p.x<=this.max.x &&
            p.y>=this.min.y && p.y<=this.max.y &&
            p.z>=this.min.z && p.z<=this.max.z);
  }

  intersectsBox(box) {
    return (this.min.x<=box.max.x && this.max.x>=box.min.x &&
            this.min.y<=box.max.y && this.max.y>=box.min.y &&
            this.min.z<=box.max.z && this.max.z>=box.min.z);
  }
}
