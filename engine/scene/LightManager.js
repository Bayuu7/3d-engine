/**
 * LightManager
 * --------------------------------------------------------------------
 * Role:
 * - Holds a list of active lights in the scene.
 * - Provides methods to add/remove and get active lights.
 *
 * Integration:
 * - Renderer queries LightManager for active lights.
 */
export class LightManager {
  constructor() {
    this.lights = [];
  }
  add(light) { this.lights.push(light); }
  remove(light) { this.lights = this.lights.filter(l => l !== light); }
  getActiveLights() { return this.lights.filter(l => l.enabled); }
}
