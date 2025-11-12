/**
 * Transform
 * --------------------------------------------------------------------
 * Role:
 * - Stores position, rotation (Euler), scale, and a model matrix.
 *
 * Simplification:
 * - For this scaffold, rotation is stored but not applied to the matrix
 *   to keep the math compact. You can extend with quaternion and full
 *   TRS matrix composition later.
 *
 * Integration:
 * - Used by Entity; Renderer would consume modelMatrix for drawing.
 */
import { Vector3 } from '../core/Vector3.js';
import { Matrix4 } from '../core/Matrix4.js';
import { MathUtils } from '../utils/MathUtils.js';

export class Transform {
  constructor() {
    this.position = new Vector3(0,0,0);
    this.rotation = new Vector3(0,0,0); // Euler angles in radians
    this.scale = new Vector3(1,1,1);
    this.modelMatrix = new Matrix4();
    /** Dirty flag to indicate the modelMatrix needs recomputation. */
    this._dirty = true;
  }

  /** Rebuilds the modelMatrix; currently Translation * Scale only. */
  updateMatrix() {
    const T = new Matrix4().makeTranslation(this.position.x, this.position.y, this.position.z);
    const S = new Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z);
    this.modelMatrix.multiply(T, S);
    this._dirty = false;
  }

  setPosition(x, y, z) { this.position.set(x,y,z); this._dirty = true; this.updateMatrix(); }
  setScale(x, y, z) { this.scale.set(x,y,z); this._dirty = true; this.updateMatrix(); }
  setRotationEuler(degX, degY, degZ) {
    this.rotation.set(MathUtils.degToRad(degX), MathUtils.degToRad(degY), MathUtils.degToRad(degZ));
    // Rotation not applied to matrix in this minimal implementation.
    this._dirty = true;
  }
}
