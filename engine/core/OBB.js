import { Vector3 } from './Vector3.js';

/**
 * OBB
 * --------------------------------------------------------------------
 * Role:
 * - Oriented bounding box defined by center, axes (u,v,w), and half-extents.
 * - For picking against rotated/scaled meshes.
 */
export class OBB {
  constructor(center=new Vector3(), half=new Vector3(0.5,0.5,0.5), axes=[new Vector3(1,0,0), new Vector3(0,1,0), new Vector3(0,0,1)]) {
    this.center = center;
    this.half = half;
    this.axes = axes; // 3 orthonormal axes
  }

  // Ray-OBB test: project ray onto axes and solve slabs
  rayIntersect(ray) {
    let tMin = -Infinity;
    let tMax = Infinity;
    const p = new Vector3().copy(this.center).sub(ray.origin);

    for (let i=0;i<3;i++){
      const a = this.axes[i];
      const e = a.x*p.x + a.y*p.y + a.z*p.z;
      const f = a.x*ray.direction.x + a.y*ray.direction.y + a.z*ray.direction.z;

      if (Math.abs(f) > 1e-6) {
        const t1 = (e + this.half.getComponent(i)) / f;
        const t2 = (e - this.half.getComponent(i)) / f;
        const tNear = Math.min(t1,t2), tFar = Math.max(t1,t2);
        tMin = Math.max(tMin, tNear);
        tMax = Math.min(tMax, tFar);
        if (tMin > tMax) return null;
      } else {
        // Ray parallel to slab; reject if outside
        if (-e - this.half.getComponent(i) > 0 || -e + this.half.getComponent(i) < 0) return null;
      }
    }
    if (tMax < 0) return null;
    return tMin >= 0 ? tMin : tMax;
  }
}

// helper to get component of Vector3 by index
Vector3.prototype.getComponent = function(i){ return i===0?this.x:i===1?this.y:this.z; };
