/**
 * BoundingSphere
 * --------------------------------------------------------------------
 * Role:
 * - Simple bounding volume defined by center + radius.
 * - Useful for quick intersection tests.
 */
import { Vector3 } from './Vector3.js';

export class BoundingSphere {
  constructor(center=new Vector3(), radius=0) {
    this.center=center; this.radius=radius;
  }

  setFromPoints(points) {
    // naive: compute average center, then max distance
    this.center.set(0,0,0);
    for (const p of points) {
      this.center.x+=p.x; this.center.y+=p.y; this.center.z+=p.z;
    }
    this.center.x/=points.length; this.center.y/=points.length; this.center.z/=points.length;
    this.radius=0;
    for (const p of points) {
      const dx=p.x-this.center.x, dy=p.y-this.center.y, dz=p.z-this.center.z;
      this.radius=Math.max(this.radius, Math.hypot(dx,dy,dz));
    }
    return this;
  }

  containsPoint(p) {
    const dx=p.x-this.center.x, dy=p.y-this.center.y, dz=p.z-this.center.z;
    return (dx*dx+dy*dy+dz*dz) <= this.radius*this.radius;
  }
}
