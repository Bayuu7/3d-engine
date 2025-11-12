/**
 * Renderer (WebGL2 Stub)
 * --------------------------------------------------------------------
 * Role:
 * - Initializes a WebGL2 context, sets clear color, and clears the frame.
 * - A foundation to integrate actual drawing (meshes/materials/shaders).
 *
 * Design:
 * - Resizes canvas to device pixel ratio capped at 2 for performance.
 * - Provides setClearColor and render(scene) entry points.
 *
 * Integration:
 * - Engine holds a Renderer and calls renderer.render(activeScene).
 * - Scene.environment.backgroundColor drives clear color.
 */
export class Renderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', options);
    if (!this.gl) throw new Error('WebGL2 not supported');

    // Responsive resize routine
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        this.gl.viewport(0, 0, w, h);
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // Basic depth setup for future 3D rendering
    const gl = this.gl;
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  setClearColor(r, g, b, a) {
    const gl = this.gl;
    gl.clearColor(r, g, b, a);
  }

  /**
   * Minimal render:
   * - Apply background color from scene.environment.
   * - Clear color + depth buffers.
   * - This is where mesh draw calls would go.
   */
  render(scene) {
    const gl = this.gl;
    const bg = scene.environment.backgroundColor;
    this.setClearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // TODO: Mesh rendering pipeline (shaders, materials, geometry).
  }
}
