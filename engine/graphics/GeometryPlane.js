/**
 * GeometryPlane
 * --------------------------------------------------------------------
 * Role:
 * - Provides a simple plane geometry (XZ plane at y=0).
 * - Interleaved buffer: pos(3), normal(3).
 */
export function createPlaneGeometry(gl, size = 10) {
  const s = size;
  const vertices = [
    // positions         // normals
    -s, 0, -s,  0,1,0,
     s, 0, -s,  0,1,0,
     s, 0,  s,  0,1,0,
    -s, 0,  s,  0,1,0,
  ];
  const indices = [0,1,2, 0,2,3];

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const ebo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  gl.bindVertexArray(null);

  return { vao, vbo, ebo, vertexCount: indices.length };
}
