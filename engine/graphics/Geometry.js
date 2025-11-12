/**
 * Geometry
 * --------------------------------------------------------------------
 * Role:
 * - Holds vertex buffers (positions, colors) and index buffer.
 *
 * Design:
 * - Minimal layout: a single interleaved buffer [pos(3), color(3)].
 * - Provides bind() to enable attributes for a given Shader.
 *
 * Integration:
 * - Mesh consumes Geometry and issues draw calls.
 */
export class Geometry {
  constructor(gl, { vertices, indices }) {
    this.gl = gl;
    this.vertexCount = indices ? indices.length : vertices.length / 6;

    // Create VAO
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    // Create VBO
    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Optional EBO
    this.ebo = null;
    if (indices) {
      this.ebo = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    }

    // Unbind
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  /** Enable attributes on the currently bound VAO for a given shader. */
  setupAttributes(shader) {
    const gl = this.gl;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);

    const stride = 6 * 4; // 6 floats * 4 bytes
    const posLoc = shader.getAttribLocation('a_position');
    const colLoc = shader.getAttribLocation('a_color');

    if (posLoc >= 0) {
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, stride, 0);
    }
    if (colLoc >= 0) {
      gl.enableVertexAttribArray(colLoc);
      gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, false, stride, 3 * 4);
    }
  }

  bind() { this.gl.bindVertexArray(this.vao); }
  unbind() { this.gl.bindVertexArray(null); }

  dispose() {
    const gl = this.gl;
    if (this.vao) gl.deleteVertexArray(this.vao);
    if (this.vbo) gl.deleteBuffer(this.vbo);
    if (this.ebo) gl.deleteBuffer(this.ebo);
  }
}
