import { OBB } from '../core/OBB.js';
import { Vector3 } from '../core/Vector3.js';

export class MeshRenderer {
  constructor(gl, geometry, material) {
    this.gl = gl;
    this.geometry = geometry;
    this.material = material;
    this.visible = true;
    this.tintSelected = [0.2, 0.6, 1.0];
  }

  getWorldAABB(transform) {
    const min = this.geometry.aabb?.min || { x:-0.5,y:-0.5,z:-0.5 };
    const max = this.geometry.aabb?.max || { x: 0.5,y: 0.5,z: 0.5 };
    const sx = transform.scale.x, sy = transform.scale.y, sz = transform.scale.z;
    const px = transform.position.x, py = transform.position.y, pz = transform.position.z;
    return {
      min: { x: px + min.x*sx, y: py + min.y*sy, z: pz + min.z*sz },
      max: { x: px + max.x*sx, y: py + max.y*sy, z: pz + max.z*sz }
    };
  }

  // Build OBB from modelMatrix: axes = columns 0..2 normalized, center from translation, half-extents from local aabb scaled
  getWorldOBB(transform) {
    const m = transform.modelMatrix.elements;
    const center = new Vector3(m[12], m[13], m[14]);
    const ax = new Vector3(m[0], m[1], m[2]).normalize();
    const ay = new Vector3(m[4], m[5], m[6]).normalize();
    const az = new Vector3(m[8], m[9], m[10]).normalize();
    const halfLocal = new Vector3(
      Math.abs(this.geometry.aabb?.max.x || 0.5),
      Math.abs(this.geometry.aabb?.max.y || 0.5),
      Math.abs(this.geometry.aabb?.max.z || 0.5)
    );
    const half = new Vector3(
      halfLocal.x * transform.scale.x,
      halfLocal.y * transform.scale.y,
      halfLocal.z * transform.scale.z
    );
    return new OBB(center, half, [ax, ay, az]);
  }

  draw(modelMatrix, viewMatrix, projMatrix, camera, light, options={}) {
    const gl = this.gl;
    this.material.use();
    this.material.setMat4('u_model', modelMatrix);
    this.material.setMat4('u_view', viewMatrix);
    this.material.setMat4('u_proj', projMatrix);

    if (light) {
      const shader = this.material.shader;
      gl.uniform3fv(shader.getUniformLocation('u_lightDir'),
                    [light.direction.x, light.direction.y, light.direction.z]);
      gl.uniform3fv(shader.getUniformLocation('u_lightColor'), light.color);
      gl.uniform1f(shader.getUniformLocation('u_lightIntensity'), light.intensity ?? 1.0);
    }

    const tint = options.selected ? this.tintSelected : [0,0,0];
    const locTint = this.material.shader.getUniformLocation('u_tint');
    if (locTint) gl.uniform3fv(locTint, tint);

    gl.bindVertexArray(this.geometry.vao);
    const stride = this.geometry.stride ?? (6 * 4);
    const posLoc = this.material.shader.getAttribLocation('a_position');
    const normLoc = this.material.shader.getAttribLocation('a_normal');
    gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vbo);
    if (posLoc>=0) { gl.enableVertexAttribArray(posLoc); gl.vertexAttribPointer(posLoc,3,gl.FLOAT,false,stride,0); }
    if (normLoc>=0) { gl.enableVertexAttribArray(normLoc); gl.vertexAttribPointer(normLoc,3,gl.FLOAT,false,stride,3*4); }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.geometry.ebo);
    gl.drawElements(gl.TRIANGLES, this.geometry.vertexCount, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
  }
}
