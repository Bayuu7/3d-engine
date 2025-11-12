/**
 * Renderer (WebGL2 with Pipeline)
 * --------------------------------------------------------------------
 * Role:
 * - Owns the WebGL2 context; sets viewport and clears buffers.
 * - Holds a RenderPipeline and an active Camera reference.
 *
 * Integration:
 * - Engine creates Renderer, then sets/updates the Camera.
 * - Renderer.render(scene) delegates mesh drawing to the pipeline.
 */
import { RenderPipeline } from './RenderPipeline.js';

export class Renderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', options);
    if (!this.gl) throw new Error('WebGL2 not supported');

    this.pipeline = new RenderPipeline(this.gl);
    this.camera = null; // Engine will set this

    // Responsive resize routine
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        this.gl.viewport(0, 0, w, h);
        if (this.camera) {
          this.camera.aspect = w / h;
          this.camera.updateMatrices();
        }
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // Basic depth setup
    const gl = this.gl;
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  setClearColor(r, g, b, a) {
    const gl = this.gl;
    gl.clearColor(r, g, b, a);
  }

  render(scene) {
    const gl = this.gl;
    if (!this.camera) return;

    const bg = scene.environment.backgroundColor;
    this.setClearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.pipeline.render(scene, this.camera);
  }
}
