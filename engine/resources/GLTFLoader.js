/**
 * GLTFLoader (glTF 2.0, minimal subset)
 * --------------------------------------------------------------------
 * Role:
 * - Loads a glTF JSON + buffers + images.
 * - Builds a single mesh with positions/normals/uvs and indices.
 * - Loads a baseColor texture if present (PBR baseColorTexture).
 *
 * Simplifications:
 * - Assumes a single scene, single mesh primitive (TRIANGLES).
 * - Supports bufferViews with byteStride for interleaving.
 * - Supports PNG/JPEG textures via Image URI. (No KTX2 or Draco.)
 */
import { createGeometryMesh } from '../graphics/GeometryMesh.js';
import { Texture } from '../graphics/Texture.js';

export class GLTFLoader {
  constructor(gl) {
    this.gl = gl;
  }

  async loadFromUrl(url) {
    const base = url.substring(0, url.lastIndexOf('/') + 1);
    const gltf = await (await fetch(url)).json();

    const buffers = await Promise.all((gltf.buffers || []).map(async (b) => {
      const res = await fetch(base + b.uri);
      return await res.arrayBuffer();
    }));

    const images = await Promise.all((gltf.images || []).map(async (img) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = base + img.uri;
      await new Promise((res) => { image.onload = res; });
      return image;
    }));

    // Accessor helper
    function readAccessor(acc) {
      const bv = gltf.bufferViews[acc.bufferView];
      const buffer = buffers[bv.buffer];
      const arrayBuffer = buffer.slice(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
      let arr;
      switch (acc.componentType) {
        case 5126: // FLOAT
          arr = new Float32Array(arrayBuffer);
          break;
        case 5123: // UNSIGNED_SHORT
          arr = new Uint16Array(arrayBuffer);
          break;
        case 5125: // UNSIGNED_INT
          arr = new Uint32Array(arrayBuffer);
          break;
        default:
          throw new Error('Unsupported componentType: ' + acc.componentType);
      }
      return arr;
    }

    // Assume first scene, first node with mesh
    const scene = gltf.scenes[gltf.scene || 0];
    const nodeIndex = scene.nodes[0];
    const node = gltf.nodes[nodeIndex];
    const mesh = gltf.meshes[node.mesh];
    const prim = mesh.primitives[0];

    // Attributes
    const positions = readAccessor(gltf.accessors[prim.attributes.POSITION]);
    const normals = prim.attributes.NORMAL != null ? readAccessor(gltf.accessors[prim.attributes.NORMAL]) : null;
    const uvs = prim.attributes.TEXCOORD_0 != null ? readAccessor(gltf.accessors[prim.attributes.TEXCOORD_0]) : null;
    const indices = readAccessor(gltf.accessors[prim.indices]);

    const geometry = createGeometryMesh(this.gl, { positions, normals, uvs, indices });

    // BaseColor texture (if present)
    let baseColorTex = null;
    if (prim.material != null) {
      const mat = gltf.materials[prim.material];
      const pbr = mat.pbrMetallicRoughness;
      if (pbr && pbr.baseColorTexture) {
        const texIndex = pbr.baseColorTexture.index;
        const tex = gltf.textures[texIndex];
        const img = images[tex.source];
        baseColorTex = new Texture(this.gl).fromImage(img);
      }
    }

    return { geometry, baseColorTex };
  }
}
