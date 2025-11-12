/**
 * Vector2
 * --------------------------------------------------------------------
 * Role:
 * - 2D vector with common operations.
 */
export class Vector2 {
  constructor(x=0,y=0) { this.x=x; this.y=y; }
  set(x,y){ this.x=x; this.y=y; return this; }
  copy(v){ this.x=v.x; this.y=v.y; return this; }
  clone(){ return new Vector2(this.x,this.y); }

  add(v){ this.x+=v.x; this.y+=v.y; return this; }
  sub(v){ this.x-=v.x; this.y-=v.y; return this; }
  multiplyScalar(s){ this.x*=s; this.y*=s; return this; }

  length(){ return Math.hypot(this.x,this.y); }
  normalize(){ const l=this.length()||1; this.x/=l; this.y/=l; return this; }
}
