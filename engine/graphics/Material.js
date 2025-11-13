/**
 * Material
 * --------------------------------------------------------------------
 * Role:
 * - Holds shader and uniform setters.
 * - Extended to support texture binding for baseColor.
 */
export class Material {
  constructor(shader) {
    this.shader = shader;
    this.uniformCache = new Map();
    this.baseColorTex = null;
  }

  use() { this.shader.use(); }

  setMat4(name, mat) {
    const gl = this.shader.gl;
    const loc = this.getUniformLocation(name);
    gl.uniformMatrix4fv(loc, false, mat.elements);
  }

  setVec3(name, v) {
    const gl = this.shader.gl;
    const loc = this.getUniformLocation(name);
    gl.uniform3fv(loc, [v.x, v.y, v.z]);
  }

  setInt(name, i) {
    const gl = this.shader.gl;
    const loc = this.getUniformLocation(name);
    gl.uniform1i(loc, i);
  }

  bindBaseColorTexture(unit=0) {
    if (!this.baseColorTex) return;
    this.baseColorTex.bind(unit);
    this.setInt('u_baseColorTex', unit);
  }

  getUniformLocation(name) {
    if (this.uniformCache.has(name)) return this.uniformCache.get(name);
    const loc = this.shader.getUniformLocation(name);
    this.uniformCache.set(name, loc);
    return loc;
  }
}
