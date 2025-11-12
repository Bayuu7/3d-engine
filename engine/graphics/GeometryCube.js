/**
 * GeometryCube
 * --------------------------------------------------------------------
 * Role:
 * - Provides a cube geometry with positions + normals.
 * - Interleaved buffer: pos(3), normal(3).
 */
export function createCubeGeometry(gl) {
  const s = 1;
  const vertices = [
    // positions        // normals
    -s,-s,-s,  0,0,-1,
     s,-s,-s,  0,0,-1,
     s, s,-s,  0,0,-1,
    -s, s,-s,  0,0,-1,

    -s,-s, s,  0,0,1,
     s,-s, s,  0,0,1,
     s, s, s,  0,0,1,
    -s, s, s,  0,0,1,

    -s,-s,-s, -1,0,0,
    -s, s,-s, -1,0,0,
    -s, s, s, -1,0,0,
    -s,-s, s, -1,0,0,

     s,-s,-s,  1,0,0,
     s, s,-s,  1,0,0,
     s, s, s,  1,0,0,
     s,-s, s,  1,0,0,

    -s,-s,-s, 0,-1,0,
    -s,-s, s, 0,-1,0,
     s,-s, s, 0,-1,0,
     s,-s,-s, 0,-1,0,

    -s, s,-s, 0,1,0,
    -s, s, s, 0,1,0,
     s, s, s, 0,1,0,
     s, s,-s, 0,1,0,
  ];
  const indices = [
    0,1,2, 0,2,3,
    4,5,6, 4,6,7,
    8,9,10, 8,10,11,
    12,13,14, 12,14,15,
    16,17,18, 16,18,19,
    20,21,22, 20,22,23
  ];

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
