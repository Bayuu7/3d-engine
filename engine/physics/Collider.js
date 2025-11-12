/**
 * Collider
 * --------------------------------------------------------------------
 * Role:
 * - Simple collider component.
 * - For now, only supports a ground plane at y=0.
 */
export class Collider {
  constructor(type = 'plane') {
    this.type = type; // 'plane'
    this.normal = { x: 0, y: 1, z: 0 };
    this.offset = 0; // plane equation: n·p + offset = 0
  }
}
