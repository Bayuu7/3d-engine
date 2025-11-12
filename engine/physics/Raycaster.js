/**
 * Raycaster (Minimal)
 * --------------------------------------------------------------------
 * Role:
 * - Casts a ray and tests intersection against simple axis-aligned
 *   bounding boxes (AABB) defined per entity (component "aabb").
 *
 * Integration:
 * - Frontend can convert screen coordinates to a Ray and call cast().
 */
export class Raycaster {
  constructor() {}

  /**
   * Intersect ray with entities that have an 'aabb' component:
   * aabb: { min: {x,y,z}, max: {x,y,z} } in world space
   * Returns the closest hit entity or null.
   */
  cast(ray, scene) {
    let closest = null;
    let closestT = Infinity;

    for (const e of scene.entities) {
      const aabb = e.getComponent('aabb');
      if (!aabb || !e.visible || !e.active) continue;
      const t = this._intersectAABB(ray, aabb);
      if (t !== null && t < closestT) {
        closestT = t;
        closest = e;
      }
    }
    return closest;
  }

  // Slab method AABB intersection; returns t or null
  _intersectAABB(ray, aabb) {
    const min = aabb.min; const max = aabb.max;
    let tmin = -Infinity, tmax = Infinity;

    const origin = ray.origin; const dir = ray.direction;
    for (const axis of ['x','y','z']) {
      const o = origin[axis], d = dir[axis];
      const invD = 1 / (d === 0 ? 1e-6 : d);
      let t0 = (min[axis] - o) * invD;
      let t1 = (max[axis] - o) * invD;
      if (t0 > t1) [t0, t1] = [t1, t0];
      tmin = Math.max(tmin, t0);
      tmax = Math.min(tmax, t1);
      if (tmax < tmin) return null;
    }
    return tmin >= 0 ? tmin : (tmax >= 0 ? tmax : null);
  }
}
