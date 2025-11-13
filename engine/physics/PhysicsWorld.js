import { Vector3 } from '../core/Vector3.js';
import { ColliderAABB } from './ColliderAABB.js';

export class PhysicsWorld {
  constructor() {
    this.gravity = new Vector3(0,-9.81,0);
    this.colliders = []; // plane colliders
  }

  addCollider(c) { this.colliders.push(c); }

  step(scene, dt) {
    // 1) Integrate rigid bodies
    for (const e of scene.entities) {
      const rb = e.getComponent('rigidBody');
      if (!rb || rb.isKinematic) continue;
      if (rb.useGravity) rb.velocity.y += this.gravity.y * dt;
      e.transform.position.add(rb.velocity.clone().multiplyScalar(dt));

      // Plane collisions (y=offset)
      for (const c of this.colliders) {
        if (c.type==='plane' && e.transform.position.y < c.offset) {
          e.transform.position.y = c.offset;
          rb.velocity.y = 0;
        }
      }
      e.transform.updateMatrix();
    }

    // 2) Broad-phase naive: check every pair with AABB collider
    const bodies = scene.entities
      .map(e => ({ e, rb: e.getComponent('rigidBody'), aabb: e.getComponent('colliderAABB') }))
      .filter(x => x.aabb);

    for (let i=0; i<bodies.length; i++) {
      for (let j=i+1; j<bodies.length; j++) {
        const A = bodies[i], B = bodies[j];
        const pa = A.e.transform.position, pb = B.e.transform.position;
        const a = A.aabb, b = B.aabb;

        const overlapX = Math.abs(pa.x - pb.x) <= (a.hx + b.hx);
        const overlapY = Math.abs(pa.y - pb.y) <= (a.hy + b.hy);
        const overlapZ = Math.abs(pa.z - pb.z) <= (a.hz + b.hz);

        if (overlapX && overlapY && overlapZ) {
          // Resolve by minimum translation along the smallest overlap axis
          const dx = (a.hx + b.hx) - Math.abs(pa.x - pb.x);
          const dy = (a.hy + b.hy) - Math.abs(pa.y - pb.y);
          const dz = (a.hz + b.hz) - Math.abs(pa.z - pb.z);

          if (dx <= dy && dx <= dz) {
            const dir = pa.x < pb.x ? -1 : 1;
            pa.x += dir * dx * 0.5;
            pb.x -= dir * dx * 0.5;
            if (A.rb) A.rb.velocity.x = 0;
            if (B.rb) B.rb.velocity.x = 0;
          } else if (dy <= dx && dy <= dz) {
            const dir = pa.y < pb.y ? -1 : 1;
            pa.y += dir * dy * 0.5;
            pb.y -= dir * dy * 0.5;
            if (A.rb) A.rb.velocity.y = 0;
            if (B.rb) B.rb.velocity.y = 0;
          } else {
            const dir = pa.z < pb.z ? -1 : 1;
            pa.z += dir * dz * 0.5;
            pb.z -= dir * dz * 0.5;
            if (A.rb) A.rb.velocity.z = 0;
            if (B.rb) B.rb.velocity.z = 0;
          }

          A.e.transform.updateMatrix();
          B.e.transform.updateMatrix();
        }
      }
    }
  }
}
