export class Matrix4 {
  constructor(){ this.elements = new Float32Array(16); this.identity(); }
  identity(){ const e=this.elements; e[0]=1;e[1]=0;e[2]=0;e[3]=0; e[4]=0;e[5]=1;e[6]=0;e[7]=0; e[8]=0;e[9]=0;e[10]=1;e[11]=0; e[12]=0;e[13]=0;e[14]=0;e[15]=1; return this; }
  copy(m){ this.elements.set(m.elements); return this; }
  clone(){ const m=new Matrix4(); m.elements.set(this.elements); return m; }

  // this = a * b
  multiply(a,b){ const ae=a.elements, be=b.elements, e=this.elements;
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        e[i + j*4] = ae[0 + j*4]*be[i + 0*4] + ae[1 + j*4]*be[i + 1*4] + ae[2 + j*4]*be[i + 2*4] + ae[3 + j*4]*be[i + 3*4];
      }
    }
    return this;
  }

  makeTranslation(x,y,z){ this.identity(); const e=this.elements; e[12]=x; e[13]=y; e[14]=z; return this; }
  makeScale(x,y,z){ this.identity(); const e=this.elements; e[0]=x; e[5]=y; e[10]=z; return this; }
  makeRotationX(rad){ this.identity(); const c=Math.cos(rad), s=Math.sin(rad), e=this.elements; e[5]=c; e[6]=s; e[9]=-s; e[10]=c; return this; }
  makeRotationY(rad){ this.identity(); const c=Math.cos(rad), s=Math.sin(rad), e=this.elements; e[0]=c; e[2]=-s; e[8]=s; e[10]=c; return this; }
  makeRotationZ(rad){ this.identity(); const c=Math.cos(rad), s=Math.sin(rad), e=this.elements; e[0]=c; e[1]=s; e[4]=-s; e[5]=c; return this; }

  // In-place inversion (Gauss-Jordan)
  invert() {
    const m = this.elements;
    const inv = new Float32Array(16);
    inv[0]=m[5]*m[10]*m[15]-m[5]*m[11]*m[14]-m[9]*m[6]*m[15]+m[9]*m[7]*m[14]+m[13]*m[6]*m[11]-m[13]*m[7]*m[10];
    inv[4]=-m[4]*m[10]*m[15]+m[4]*m[11]*m[14]+m[8]*m[6]*m[15]-m[8]*m[7]*m[14]-m[12]*m[6]*m[11}+m[12]*m[7]*m[10];
    inv[8]=m[4]*m[9]*m[15]-m[4]*m[11]*m[13]-m[8]*m[5]*m[15]+m[8]*m[7]*m[13]+m[12]*m[5]*m[11]-m[12]*m[7]*m[9];
    inv[12]=-m[4]*m[9]*m[14]+m[4]*m[10]*m[13]+m[8]*m[5]*m[14]-m[8]*m[6]*m[13]-m[12]*m[5]*m[10]+m[12]*m[6]*m[9];
    inv[1]=-m[1]*m[10]*m[15]+m[1]*m[11]*m[14]+m[9]*m[2]*m[15]-m[9]*m[3]*m[14]-m[13]*m[2]*m[11]+m[13]*m[3]*m[10];
    inv[5]=m[0]*m[10]*m[15]-m[0]*m[11]*m[14]-m[8]*m[2]*m[15]+m[8]*m[3]*m[14]+m[12]*m[2]*m[11]-m[12]*m[3]*m[10];
    inv[9]=-m[0]*m[9]*m[15]+m[0]*m[11]*m[13]+m[8]*m[1]*m[15]-m[8]*m[3]*m[13]-m[12]*m[1]*m[11]+m[12]*m[3]*m[9];
    inv[13]=m[0]*m[9]*m[14]-m[0]*m[10]*m[13]-m[8]*m[1]*m[14]+m[8]*m[2]*m[13]+m[12]*m[1]*m[10]-m[12]*m[2]*m[9];
    inv[2]=m[1]*m[6]*m[15]-m[1]*m[7]*m[14]-m[5]*m[2]*m[15]+m[5]*m[3]*m[14]+m[13]*m[2]*m[7]-m[13]*m[3]*m[6];
    inv[6]=-m[0]*m[6]*m[15]+m[0]*m[7]*m[14]+m[4]*m[2]*m[15]-m[4]*m[3]*m[14]-m[12]*m[2]*m[7]+m[12]*m[3]*m[6];
    inv[10]=m[0]*m[5]*m[15]-m[0]*m[7]*m[13]-m[4]*m[1]*m[15]+m[4]*m[3]*m[13]+m[12]*m[1]*m[7]-m[12]*m[3]*m[5];
    inv[14]=-m[0]*m[5]*m[14]+m[0]*m[6]*m[13]+m[4]*m[1]*m[14]-m[4]*m[2]*m[13]-m[12]*m[1]*m[6]+m[12]*m[2]*m[5];
    inv[3]=-m[1]*m[6]*m[11]+m[1]*m[7]*m[10]+m[5]*m[2]*m[11]-m[5]*m[3]*m[10]-m[9]*m[2]*m[7]+m[9]*m[3]*m[6];
    inv[7]=m[0]*m[6]*m[11]-m[0]*m[7]*m[10]-m[4]*m[2]*m[11]+m[4]*m[3]*m[10]+m[8]*m[2]*m[7]-m[8]*m[3]*m[6];
    inv[11]=-m[0]*m[5]*m[11]+m[0]*m[7]*m[9]+m[4]*m[1]*m[11]-m[4]*m[3]*m[9]-m[8]*m[1]*m[7]+m[8]*m[3]*m[5];
    inv[15]=m[0]*m[5]*m[10]-m[0]*m[6]*m[9]-m[4]*m[1]*m[10]+m[4]*m[2]*m[9]+m[8]*m[1]*m[6]-m[8]*m[2]*m[5];
    let det = m[0]*inv[0] + m[1]*inv[4] + m[2]*inv[8] + m[3]*inv[12];
    if (det === 0) return this.identity();
    det = 1.0 / det;
    for (let i=0;i<16;i++) this.elements[i] = inv[i] * det;
    return this;
  }
}
