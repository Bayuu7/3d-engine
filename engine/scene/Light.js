/**
 * Light
 * --------------------------------------------------------------------
 * Role:
 * - Represents a light source (directional or point).
 * - Stores color, intensity, and flags for enabled/disabled.
 *
 * Integration:
 * - Renderer passes active lights to shaders via uniforms.
 */
import { Vector3 } from '../core/Vector3.js';

export class Light {
  constructor(type = 'directional') {
    this.type = type; // 'directional' | 'point'
    this.color = [1,1,1];
    this.intensity = 1.0;
    this.enabled = true;

    // Directional: direction vector
    this.direction = new Vector3(0,-1,0);
    // Point: position vector
    this.position = new Vector3(0,0,0);
  }
}
