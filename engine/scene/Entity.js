/**
 * Entity
 * --------------------------------------------------------------------
 * Role:
 * - Scene object with a Transform and a component map.
 *
 * Integration:
 * - Added to Scene; Renderer reads transform for drawing.
 * - Components can be systems-specific (e.g., MeshRenderer, Collider).
 */
import { Transform } from './Transform.js';

export class Entity {
  constructor(name = 'Entity') {
    this.name = name;
    this.transform = new Transform();
    /** Component registry by key string. */
    this.components = new Map();
    /** Visibility flag for renderer culling. */
    this.visible = true;
    /** Active flag to enable/disable updates. */
    this.active = true;
  }

  addComponent(key, comp) {
    this.components.set(key, comp);
    return comp;
  }

  getComponent(key) {
    return this.components.get(key) || null;
  }
}
