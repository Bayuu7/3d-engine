import { Vector3 } from '../core/Vector3.js';

export class Light {
  constructor(type='directional'){
    this.type = type; // 'directional' | 'point'
    this.enabled = true;
    this.color = [1,1,1];
    this.intensity = 1.0;
    this.direction = new Vector3(-0.5,-1,-0.3);
    this.position = new Vector3(0,0,0);
  }
}
