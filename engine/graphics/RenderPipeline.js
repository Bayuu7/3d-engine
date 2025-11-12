/**
 * RenderPipeline
 * --------------------------------------------------------------------
 * Role:
 * - Orchestrates rendering: sets global state, walks scene entities,
 *   and draws Mesh components using the active Camera.
 *
 * Integration:
 * - Used by Renderer; Renderer owns WebGL context and pipeline instance.
 */
export class RenderPipeline {
  constructor(gl) {
    this.gl = gl;
    /** Flag: enable backface culling */
    this.enableCulling = true;
    /** Flag: enable depth test (already enabled by Renderer) */
    this.enableDepth = true;
  }

  render(scene, camera) {
    const gl = this.gl;

    // Setup global GL state
    if (this.enableCulling) { gl.enable(gl.CULL_FACE); gl.cullFace(gl.BACK); }
    else { gl.disable(gl.CULL_FACE); }

    // For each entity, if it has a mesh component, draw it
    for (const e of scene.entities) {
      if (!e.visible || !e.active) continue;
      const mesh = e.getComponent('mesh');
      if (!mesh || !mesh.visible) continue;

      // Ensure transform matrix is ready
      if (e.transform._dirty) e.transform.updateMatrix();

      mesh.draw(e.transform.modelMatrix, camera.view, camera.projection);
    }
  }
}
