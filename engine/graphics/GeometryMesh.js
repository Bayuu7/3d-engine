/**
 * GeometryMesh
 * --------------------------------------------------------------------
 * Role:
 * - Create a VAO from provided arrays: positions, normals, uvs, indices.
 */
export function createGeometryMesh(gl, { positions, normals, uvs, indices }) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  // Interleave into single VBO: pos(3), normal(3), uv(2)
  const vertexCount = positions.length / 3;
  const interleaved = new Float32Array(vertexCount * 8);
  for (let i=0;i<vertexCount;i++) {
    interleaved[i*8+0] = positions[i*3+0];
    interleaved[i*8+1] = positions[i*3+1];
    interleaved[i*8+2] = positions[i*3+2];
    interleaved[i*8+3] = normals ? normals[i*3+0] : 0;
    interleaved[i*8+4] = normals ? normals[i*3+1] : 1; // default up
    interleaved[i*8+5] = normals ? normals[i*3+2] : 0;
    interleaved[i*8+6] = uvs ? uvs[i*2+0] : 0;
    interleaved[i*8+7] = uvs ? uvs[i*2+1] : 0;
  }

  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, interleaved, gl.STATIC_DRAW);

  const ebo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);

  gl.bindVertexArray(null);

  return {
    vao, vbo, ebo,
    vertexCount: indices.length,
    stride: 8 * 4
  };
}
