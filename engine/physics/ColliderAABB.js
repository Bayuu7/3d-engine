/**
 * ColliderAABB
 * --------------------------------------------------------------------
 * Role:
 * - Axis-aligned bounding box collider for simple cube collisions.
 * - Size is half-extents (hx, hy, hz).
 */
export class ColliderAABB {
  constructor(hx=0.5, hy=0.5, hz=0.5) {
    this.hx = hx; this.hy = hy; this.hz = hz;
  }
}
