/**
 * Texture
 * --------------------------------------------------------------------
 * Role:
 * - Wraps WebGL texture creation from HTMLImageElement.
 * - Supports basic parameters (min/mag filters, wrap modes).
 */
export class Texture {
  constructor(gl) {
    this.gl = gl;
    this.handle = gl.createTexture();
    this.width = 0;
    this.height = 0;
  }

  fromImage(img, options={}) {
    const gl = this.gl;
    this.width = img.width;
    this.height = img.height;

    const {
      minFilter = gl.LINEAR_MIPMAP_LINEAR,
      magFilter = gl.LINEAR,
      wrapS = gl.REPEAT,
      wrapT = gl.REPEAT,
      flipY = true
    } = options;

    gl.bindTexture(gl.TEXTURE_2D, this.handle);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY ? 1 : 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return this;
  }

  bind(unit=0) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, this.handle);
  }
}
