import { Transform } from './Transform.js';
import { Vector3 } from '../core/Vector3.js';
import { Matrix4 } from '../core/Matrix4.js';

function perspective(fovRad, aspect, near, far) {
  const m = new Matrix4(); const e = m.elements;
  const f = 1.0 / Math.tan(fovRad / 2);
  e[0] = f / aspect; e[1]=0; e[2]=0; e[3]=0;
  e[4] = 0; e[5]=f; e[6]=0; e[7]=0;
  e[8] = 0; e[9]=0; e[10]=(far+near)/(near-far); e[11]=-1;
  e[12]=0; e[13]=0; e[14]=(2*far*near)/(near-far); e[15]=0;
  return m;
}

function lookAt(eye, target, up) {
  const z = eye.clone().sub(target).normalize();
  const x = up.clone().cross(z).normalize();
  const y = z.clone().cross(x).normalize();

  const m = new Matrix4(); const e = m.elements;
  e[0]=x.x; e[4]=x.y; e[8]=x.z; e[12]=-x.dot(eye);
  e[1]=y.x; e[5]=y.y; e[9]=y.z; e[13]=-y.dot(eye);
  e[2]=z.x; e[6]=z.y; e[10]=z.z; e[14]=-z.dot(eye);
  e[3]=0;   e[7]=0;   e[11]=0;   e[15]=1;
  return m;
}

export class Camera {
  constructor() {
    this.transform = new Transform();
    this.target = new Vector3(0,0,0);
    this.up = new Vector3(0,1,0);

    this.fov = 60;
    this.aspect = 1;
    this.near = 0.1;
    this.far = 1000;

    this.view = new Matrix4();
    this.projection = new Matrix4();

    this.orbitEnabled = true;
    this._yaw = 0;
    this._pitch = 0;
    this._radius = 6;

    this.updateMatrices();
  }

  updateMatrices() {
    this.projection = perspective((this.fov * Math.PI) / 180, this.aspect, this.near, this.far);
    const eye = this.transform.position;
    this.view = lookAt(eye, this.target, this.up);
  }

  orbit(deltaYaw, deltaPitch, deltaRadius = 0) {
    if (!this.orbitEnabled) return;
    this._yaw += deltaYaw;
    this._pitch = Math.max(Math.min(this._pitch + deltaPitch, Math.PI/2 - 0.01), -Math.PI/2 + 0.01);
    this._radius = Math.max(1, this._radius + deltaRadius);

    const x = this.target.x + this._radius * Math.cos(this._pitch) * Math.cos(this._yaw);
    const y = this.target.y + this._radius * Math.sin(this._pitch);
    const z = this.target.z + this._radius * Math.cos(this._pitch) * Math.sin(this._yaw);
    this.transform.setPosition(x, y, z);
    this.updateMatrices();
  }
}
