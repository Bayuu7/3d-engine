/**
 * Vector4
 * --------------------------------------------------------------------
 * Role:
 * - 4D vector, often used for homogeneous coordinates or RGBA colors.
 */
export class Vector4 {
  constructor(x=0,y=0,z=0,w=0){ this.x=x; this.y=y; this.z=z; this.w=w; }
  set(x,y,z,w){ this.x=x; this.y=y; this.z=z; this.w=w; return this; }
  copy(v){ this.x=v.x; this.y=v.y; this.z=v.z; this.w=v.w; return this; }
  clone(){ return new Vector4(this.x,this.y,this.z,this.w); }

  add(v){ this.x+=v.x; this.y+=v.y; this.z+=v.z; this.w+=v.w; return this; }
  sub(v){ this.x-=v.x; this.y-=v.y; this.z-=v.z; this.w-=v.w; return this; }
  multiplyScalar(s){ this.x*=s; this.y*=s; this.z*=s; this.w*=s; return this; }

  length(){ return Math.hypot(this.x,this.y,this.z,this.w); }
  normalize(){ const l=this.length()||1; this.x/=l; this.y/=l; this.z/=l; this.w/=l; return this; }
}
