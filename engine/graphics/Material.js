/**
 * Material
 * --------------------------------------------------------------------
 * Role:
 * - Wraps a Shader and provides a uniform setting API.
 *
 * Integration:
 * - Mesh uses Material to bind the shader and push per-draw uniforms
 *   like model/view/projection matrices.
 */
export class Material {
  constructor(shader) {
    this.shader = shader;
    /** Arbitrary flags for rendering behavior (e.g., wireframe). */
    this.flags = { wireframe: false };
  }

  use() {
    this.shader.use();
  }

  setMat4(name, mat4) {
    const gl = this.shader.gl;
    const loc = this.shader.getUniformLocation(name);
    gl.uniformMatrix4fv(loc, false, mat4.elements);
  }
}
