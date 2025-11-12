import { Vector3 } from '../core/Vector3.js';

export class PhysicsWorld {
  constructor() {
    this.gravity = new Vector3(0,-9.81,0);
    this.colliders = [];
  }

  addCollider(c) { this.colliders.push(c); }

  step(scene, dt) {
    for (const e of scene.entities) {
      const rb = e.getComponent('rigidBody');
      if (!rb || rb.isKinematic) continue;
      if (rb.useGravity) {
        rb.velocity.y += this.gravity.y * dt;
      }
      e.transform.position.add(rb.velocity.clone().multiplyScalar(dt));

      // Collision with ground plane (y=0)
      for (const c of this.colliders) {
        if (c.type==='plane') {
          if (e.transform.position.y < c.offset) {
            e.transform.position.y = c.offset;
            rb.velocity.y = 0; // stop falling
          }
        }
      }

      e.transform.updateMatrix();
    }
  }
}
