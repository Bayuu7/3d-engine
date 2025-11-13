import { Vector3 } from '../core/Vector3.js';
import { Matrix4 } from '../core/Matrix4.js';

export class Transform {
  constructor(){
    this.position = new Vector3(0,0,0);
    this.rotation = new Vector3(0,0,0); // Euler radians
    this.scale = new Vector3(1,1,1);
    this.modelMatrix = new Matrix4();
    this._dirty = true;
  }
  setPosition(x,y,z){ this.position.set(x,y,z); this._dirty = true; return this; }
  setScale(x,y,z){ this.scale.set(x,y,z); this._dirty = true; return this; }
  setRotationEuler(x,y,z){ this.rotation.set(x,y,z); this._dirty = true; return this; }

  updateMatrix(){
    const T = new Matrix4().makeTranslation(this.position.x, this.position.y, this.position.z);
    const RX = new Matrix4().makeRotationX(this.rotation.x);
    const RY = new Matrix4().makeRotationY(this.rotation.y);
    const RZ = new Matrix4().makeRotationZ(this.rotation.z);
    const S = new Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z);

    const R = new Matrix4().multiply(RZ, new Matrix4().multiply(RY, RX));
    const TR = new Matrix4().multiply(T, R);
    this.modelMatrix = new Matrix4().multiply(TR, S);
    this._dirty = false;
  }
}
