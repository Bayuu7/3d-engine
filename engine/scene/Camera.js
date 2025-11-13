import { Matrix4 } from '../core/Matrix4.js';
import { Vector3 } from '../core/Vector3.js';

export class Camera {
  constructor(){
    this.transform = { position: new Vector3(0,0,5) };
    this.target = new Vector3(0,0,0);
    this.up = new Vector3(0,1,0);
    this.fov = 60 * Math.PI/180;
    this.aspect = 16/9;
    this.near = 0.1;
    this.far = 100;
    this.view = new Matrix4();
    this.projection = new Matrix4();
    this.orbitEnabled = false;
    this.orbitRadius = 10;
    this.orbitTheta = 0;
    this.orbitPhi = Math.PI/4;
  }

  updateMatrices(){
    // Projection
    const f = 1/Math.tan(this.fov/2);
    const nf = 1/(this.near - this.far);
    const e = this.projection.elements;
    e[0]=f/this.aspect; e[1]=0; e[2]=0; e[3]=0;
    e[4]=0; e[5]=f; e[6]=0; e[7]=0;
    e[8]=0; e[9]=0; e[10]=(this.far+this.near)*nf; e[11]=-1;
    e[12]=0; e[13]=0; e[14]=2*this.far*this.near*nf; e[15]=0;

    // View (lookAt)
    const eye=this.transform.position, center=this.target, up=this.up;
    const zx=eye.x-center.x, zy=eye.y-center.y, zz=eye.z-center.z;
    let rl=Math.hypot(zx,zy,zz); const zxN=zx/rl, zyN=zy/rl, zzN=zz/rl;
    const xx=up.y*zzN - up.z*zyN, xy=up.z*zxN - up.x*zzN, xz=up.x*zyN - up.y*zxN;
    rl=Math.hypot(xx,xy,xz); const xN=[xx/rl,xy/rl,xz/rl];
    const yN=[zyN*xN[2]-zzN*xN[1], zzN*xN[0]-zxN*xN[2], zxN*xN[1]-zyN*xN[0]];
    const eV=this.view.elements;
    eV[0]=xN[0]; eV[1]=yN[0]; eV[2]=zxN; eV[3]=0;
    eV[4]=xN[1]; eV[5]=yN[1]; eV[6]=zyN; eV[7]=0;
    eV[8]=xN[2]; eV[9]=yN[2]; eV[10]=zzN; eV[11]=0;
    eV[12]=-(xN[0]*eye.x+xN[1]*eye.y+xN[2]*eye.z);
    eV[13]=-(yN[0]*eye.x+yN[1]*eye.y+yN[2]*eye.z);
    eV[14]=-(zxN*eye.x+zyN*eye.y+zzN*eye.z);
    eV[15]=1;

    // Orbit update if enabled
    if (this.orbitEnabled){
      this.transform.position.x = this.target.x + this.orbitRadius*Math.sin(this.orbitPhi)*Math.cos(this.orbitTheta);
      this.transform.position.y = this.target.y + this.orbitRadius*Math.cos(this.orbitPhi);
      this.transform.position.z = this.target.z + this.orbitRadius*Math.sin(this.orbitPhi)*Math.sin(this.orbitTheta);
    }
  }
}
