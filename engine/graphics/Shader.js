export class Shader {
  constructor(gl, vsSource, fsSource) {
    this.gl = gl;
    this.program = this._createProgram(gl, vsSource, fsSource);
  }
  _compile(gl, type, source){
    const sh = gl.createShader(type);
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(sh) || 'Shader compile error');
    }
    return sh;
  }
  _createProgram(gl, vsSource, fsSource){
    const vs = this._compile(gl, gl.VERTEX_SHADER, vsSource);
    const fs = this._compile(gl, gl.FRAGMENT_SHADER, fsSource);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(prog) || 'Program link error');
    }
    return prog;
  }
  use(){ this.gl.useProgram(this.program); }
  getUniformLocation(name){ return this.gl.getUniformLocation(this.program, name); }
  getAttribLocation(name){ return this.gl.getAttribLocation(this.program, name); }
}
