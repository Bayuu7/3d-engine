import { Transform } from './Transform.js';

export class Entity {
  constructor(name='Entity') {
    this.name = name;
    this.transform = new Transform();
    this._components = new Map();
    this.visible = true;
    this.active = true;
  }
  addComponent(key, comp){ this._components.set(key, comp); return comp; }
  getComponent(key){ return this._components.get(key); }
}
