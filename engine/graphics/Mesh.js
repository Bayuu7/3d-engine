/**
 * Mesh
 * --------------------------------------------------------------------
 * Role:
 * - Couples Geometry with Material and draws it using a model matrix.
 *
 * Integration:
 * - Attached as a component to an Entity (e.g., key "mesh").
 * - RenderPipeline iterates entities, finds Mesh, and draws.
 */
export class Mesh {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material = material;
    /** Visibility flag (can be controlled from Entity.visible). */
    this.visible = true;
  }

  draw(modelMatrix, viewMatrix, projectionMatrix) {
    const gl = this.material.shader.gl;
    this.material.use();
    this.material.setMat4('u_model', modelMatrix);
    this.material.setMat4('u_view', viewMatrix);
    this.material.setMat4('u_proj', projectionMatrix);

    this.geometry.setupAttributes(this.material.shader);
    this.geometry.bind();

    // Decide draw mode: triangles only in minimal pipeline
    const indexBound = !!this.geometry.ebo;
    if (indexBound) {
      gl.drawElements(gl.TRIANGLES, this.geometry.vertexCount, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, this.geometry.vertexCount);
    }

    this.geometry.unbind();
  }
}
