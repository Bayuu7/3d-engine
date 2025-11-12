/**
 * Matrix4
 * --------------------------------------------------------------------
 * Role:
 * - 4x4 matrix for 3D transformations.
 *
 * Representation:
 * - Float32Array of 16 elements, column-major order (WebGL convention).
 *
 * Integration:
 * - Used by Transform to build model matrices; later camera/projection too.
 */
export class Matrix4 {
  constructor() {
    this.elements = new Float32Array(16);
    this.identity();
  }

  /** Resets to identity. */
  identity() {
    const e = this.elements;
    e.set([1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1]);
    return this;
  }

  /**
   * Multiplies a * b and stores result in "this".
   * This matches column-major (OpenGL/WebGL style).
   */
  multiply(a, b) {
    const ae = a.elements, be = b.elements, te = this.elements;
    for (let i=0;i<4;i++){
      for (let j=0;j<4;j++){
        te[j*4+i] =
          ae[0*4+i]*be[j*4+0] +
          ae[1*4+i]*be[j*4+1] +
          ae[2*4+i]*be[j*4+2] +
          ae[3*4+i]*be[j*4+3];
      }
    }
    return this;
  }

  /** Translation matrix. */
  makeTranslation(x, y, z) {
    this.identity();
    const e = this.elements;
    e[12] = x; e[13] = y; e[14] = z;
    return this;
  }

  /** Scale matrix. */
  makeScale(x, y, z) {
    const e = this.elements;
    e.set([x,0,0,0,  0,y,0,0,  0,0,z,0,  0,0,0,1]);
    return this;
  }
}
