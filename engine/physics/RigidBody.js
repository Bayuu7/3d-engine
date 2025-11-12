/**
 * RigidBody
 * --------------------------------------------------------------------
 * Role:
 * - Physics component representing mass, velocity, and flags.
 * - Supports gravity and simple integration.
 *
 * Flags:
 * - useGravity: apply gravity force.
 * - isKinematic: if true, not affected by physics.
 */
import { Vector3 } from '../core/Vector3.js';

export class RigidBody {
  constructor(mass = 1) {
    this.mass = mass;
    this.velocity = new Vector3(0,0,0);
    this.useGravity = true;
    this.isKinematic = false;
  }
}
