/**
 * Shader
 * --------------------------------------------------------------------
 * Role:
 * - Compiles and links WebGL shader programs; caches attribute/uniform
 *   locations for fast binding.
 *
 * Integration:
 * - Material holds a Shader instance and sets uniforms on it.
 */
export class Shader {
  constructor(gl, vsSource, fsSource) {
    this.gl = gl;
    this.program = this._createProgram(vsSource, fsSource);
    this.attrib = new Map();
    this.uniform = new Map();
  }

  _compile(type, source) {
    const gl = this.gl;
    const sh = gl.createShader(type);
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(sh);
      gl.deleteShader(sh);
      throw new Error('Shader compile error: ' + info);
    }
    return sh;
  }

  _createProgram(vsSource, fsSource) {
    const gl = this.gl;
    const vs = this._compile(gl.VERTEX_SHADER, vsSource);
    const fs = this._compile(gl.FRAGMENT_SHADER, fsSource);
    const p = gl.createProgram();
    gl.attachShader(p, vs); gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(p);
      gl.deleteProgram(p);
      throw new Error('Program link error: ' + info);
    }
    return p;
  }

  use() { this.gl.useProgram(this.program); }

  /** Lazy lookup attribute location */
  getAttribLocation(name) {
    if (!this.attrib.has(name)) {
      this.attrib.set(name, this.gl.getAttribLocation(this.program, name));
    }
    return this.attrib.get(name);
  }

  /** Lazy lookup uniform location */
  getUniformLocation(name) {
    if (!this.uniform.has(name)) {
      this.uniform.set(name, this.gl.getUniformLocation(this.program, name));
    }
    return this.uniform.get(name);
  }
}
