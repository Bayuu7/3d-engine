/**
 * PhysicsEngine
 * --------------------------------------------------------------------
 * Role:
 * - Orchestrates physics world update.
 * - Called by Engine.update(dt).
 */
import { PhysicsWorld } from './PhysicsWorld.js';

export class PhysicsEngine {
  constructor() {
    this.world = new PhysicsWorld();
    this.enabled = true;
  }

  update(scene, dt) {
    if (!this.enabled) return;
    this.world.step(scene, dt);
  }
}
