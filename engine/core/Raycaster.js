import { Vector3 } from './Vector3.js';
import { Matrix4 } from './Matrix4.js';

/**
 * Raycaster
 * --------------------------------------------------------------------
 * Role:
 * - Converts screen coords to world-space ray using inverse(view * projection).
 * - Provides ray-AABB and ray-OBB intersection helpers.
 */
export class Raycaster {
  constructor(camera) {
    this.camera = camera;
    this._invVP = new Matrix4();
  }

  getRay(x, y, canvas) {
    const nx = (2 * x / canvas.width) - 1;
    const ny = 1 - (2 * y / canvas.height);

    // clip space points at near (-1) and far (+1) z
    const nearClip = [nx, ny, -1, 1];
    const farClip = [nx, ny, 1, 1];

    // inverse VP
    const vp = new Matrix4().multiply(this.camera.projection, this.camera.view);
    const inv = vp.clone().invert();
    const unproject = (p) => {
      const e = inv.elements;
      const x = p[0], y = p[1], z = p[2], w = p[3];
      const rx = e[0]*x + e[4]*y + e[8]*z + e[12]*w;
      const ry = e[1]*x + e[5]*y + e[9]*z + e[13]*w;
      const rz = e[2]*x + e[6]*y + e[10]*z + e[14]*w;
      const rw = e[3]*x + e[7]*y + e[11]*z + e[15]*w;
      return new Vector3(rx/rw, ry/rw, rz/rw);
    };

    const nearWorld = unproject(nearClip);
    const farWorld = unproject(farClip);
    const dir = farWorld.clone().sub(nearWorld).normalize();

    return { origin: nearWorld, direction: dir };
  }

  rayIntersectsAABB(ray, aabb) {
    const invX = 1 / (ray.direction.x || 1e-6);
    const invY = 1 / (ray.direction.y || 1e-6);
    const invZ = 1 / (ray.direction.z || 1e-6);

    let tmin = (aabb.min.x - ray.origin.x) * invX;
    let tmax = (aabb.max.x - ray.origin.x) * invX;
    if (tmin > tmax) [tmin, tmax] = [tmax, tmin];

    let tymin = (aabb.min.y - ray.origin.y) * invY;
    let tymax = (aabb.max.y - ray.origin.y) * invY;
    if (tymin > tymax) [tymin, tymax] = [tymax, tymin];

    if ((tmin > tymax) || (tymin > tmax)) return null;
    if (tymin > tmin) tmin = tymin;
    if (tymax < tmax) tmax = tymax;

    let tzmin = (aabb.min.z - ray.origin.z) * invZ;
    let tzmax = (aabb.max.z - ray.origin.z) * invZ;
    if (tzmin > tzmax) [tzmin, tzmax] = [tzmax, tzmin];

    if ((tmin > tzmax) || (tzmin > tmax)) return null;
    if (tzmin > tmin) tmin = tzmin;
    if (tzmax < tmax) tmax = tzmax;

    if (tmax < 0) return null;
    const tHit = tmin >= 0 ? tmin : tmax;
    return tHit >= 0 ? tHit : null;
  }
}
