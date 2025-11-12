/**
 * Quaternion
 * --------------------------------------------------------------------
 * Role:
 * - Represents rotation in 3D space.
 * - Avoids gimbal lock compared to Euler angles.
 *
 * Integration:
 * - Used in Transform for rotation.
 * - Can be converted to/from rotation matrices.
 */
export class Quaternion {
  constructor(x=0,y=0,z=0,w=1) {
    this.x=x; this.y=y; this.z=z; this.w=w;
  }

  set(x,y,z,w) { this.x=x; this.y=y; this.z=z; this.w=w; return this; }
  copy(q) { this.x=q.x; this.y=q.y; this.z=q.z; this.w=q.w; return this; }
  clone() { return new Quaternion(this.x,this.y,this.z,this.w); }

  normalize() {
    const l = Math.hypot(this.x,this.y,this.z,this.w);
    if (l===0) { this.x=0; this.y=0; this.z=0; this.w=1; }
    else { this.x/=l; this.y/=l; this.z/=l; this.w/=l; }
    return this;
  }

  multiply(q) {
    const ax=this.x, ay=this.y, az=this.z, aw=this.w;
    const bx=q.x, by=q.y, bz=q.z, bw=q.w;
    this.x = aw*bx + ax*bw + ay*bz - az*by;
    this.y = aw*by - ax*bz + ay*bw + az*bx;
    this.z = aw*bz + ax*by - ay*bx + az*bw;
    this.w = aw*bw - ax*bx - ay*by - az*bz;
    return this;
  }

  setFromAxisAngle(axis, angleRad) {
    const half=angleRad/2, s=Math.sin(half);
    this.x=axis.x*s; this.y=axis.y*s; this.z=axis.z*s; this.w=Math.cos(half);
    return this;
  }
}
