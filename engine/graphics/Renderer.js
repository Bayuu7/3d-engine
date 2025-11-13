export class Renderer {
  constructor(canvas, config={}) {
    const gl = canvas.getContext('webgl2');
    if (!gl) throw new Error('WebGL2 not supported');
    this.gl = gl;
    this.camera = null;
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);

    window.addEventListener('resize', () => {
      canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight;
      gl.viewport(0,0,canvas.width,canvas.height);
      if (this.camera) this.camera.aspect = canvas.width / canvas.height;
    });
  }
  setClearColor(r,g,b,a){ const gl=this.gl; gl.clearColor(r,g,b,a); }
}
