/**
 * MeshRenderer
 * --------------------------------------------------------------------
 * Role:
 * - Component that holds geometry + material and draws with lighting.
 * - Updated to support multiple lights.
 */
export class MeshRenderer {
  constructor(gl, geometry, material) {
    this.gl = gl;
    this.geometry = geometry;
    this.material = material;
    this.visible = true;
  }

  draw(modelMatrix, viewMatrix, projMatrix, camera, lights) {
    const gl = this.gl;
    this.material.use();
    this.material.setMat4('u_model', modelMatrix);
    this.material.setMat4('u_view', viewMatrix);
    this.material.setMat4('u_proj', projMatrix);

    // Light uniforms
    const count = Math.min(lights.length, 4);
    const locCount = this.material.shader.getUniformLocation('u_lightCount');
    gl.uniform1i(locCount, count);

    for (let i=0; i<count; i++) {
      const l = lights[i];
      const prefix = `u_lights[${i}]`;
      gl.uniform1i(this.material.shader.getUniformLocation(prefix+'.type'), l.type==='directional'?0:1);
      gl.uniform3fv(this.material.shader.getUniformLocation(prefix+'.color'), l.color);
      gl.uniform1f(this.material.shader.getUniformLocation(prefix+'.intensity'), l.intensity);
      gl.uniform3fv(this.material.shader.getUniformLocation(prefix+'.direction'), [l.direction.x,l.direction.y,l.direction.z]);
      gl.uniform3fv(this.material.shader.getUniformLocation(prefix+'.position'), [l.position.x,l.position.y,l.position.z]);
    }

    const locViewPos = this.material.shader.getUniformLocation('u_viewPos');
    gl.uniform3fv(locViewPos, [camera.transform.position.x, camera.transform.position.y, camera.transform.position.z]);

    // Setup attributes
    gl.bindVertexArray(this.geometry.vao);
    const stride = 6*4;
    const posLoc = this.material.shader.getAttribLocation('a_position');
    const normLoc = this.material.shader.getAttribLocation('a_normal');
    gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vbo);
    if (posLoc>=0) {
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc,3,gl.FLOAT,false,stride,0);
    }
    if (normLoc>=0) {
      gl.enableVertexAttribArray(normLoc);
      gl.vertexAttribPointer(normLoc,3,gl.FLOAT,false,stride,3*4);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.geometry.ebo);
    gl.drawElements(gl.TRIANGLES, this.geometry.vertexCount, gl.UNSIGNED_SHORT, 0);

    gl.bindVertexArray(null);
  }
}
