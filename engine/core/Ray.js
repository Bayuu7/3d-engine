/**
 * Ray
 * --------------------------------------------------------------------
 * Role:
 * - Represents a ray with origin and direction for picking/collision.
 */
import { Vector3 } from './Vector3.js';

export class Ray {
  constructor(origin = new Vector3(), direction = new Vector3(0,0,-1)) {
    this.origin = origin.clone();
    this.direction = direction.clone().normalize();
  }
}
