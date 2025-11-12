/**
 * Serializer
 * --------------------------------------------------------------------
 * Role:
 * - Converts Scene and Entities into JSON and back.
 * - Handles Transform and basic components (meshRenderer, light).
 *
 * Simplification:
 * - MeshRenderer and Light are serialized minimally (type + params).
 */
export class Serializer {
  static serializeScene(scene) {
    const entities = [];
    for (const e of scene.entities) {
      const obj = {
        name: e.name,
        visible: e.visible,
        active: e.active,
        transform: {
          position: { x: e.transform.position.x, y: e.transform.position.y, z: e.transform.position.z },
          scale: { x: e.transform.scale.x, y: e.transform.scale.y, z: e.transform.scale.z },
          rotation: { x: e.transform.rotation.x, y: e.transform.rotation.y, z: e.transform.rotation.z }
        },
        components: {}
      };
      if (e.getComponent('light')) {
        const l = e.getComponent('light');
        obj.components.light = {
          type: l.type,
          color: l.color,
          intensity: l.intensity,
          direction: { x: l.direction.x, y: l.direction.y, z: l.direction.z }
        };
      }
      if (e.getComponent('meshRenderer')) {
        obj.components.meshRenderer = { type: 'cube' }; // simplified
      }
      entities.push(obj);
    }
    return JSON.stringify({ name: scene.name, entities }, null, 2);
  }

  static deserializeScene(json, engine) {
    const data = JSON.parse(json);
    const scene = engine.sceneManager.active;
    scene.clear();
    for (const obj of data.entities) {
      const e = new (await import('../scene/Entity.js')).Entity(obj.name);
      e.visible = obj.visible;
      e.active = obj.active;
      e.transform.setPosition(obj.transform.position.x, obj.transform.position.y, obj.transform.position.z);
      e.transform.setScale(obj.transform.scale.x, obj.transform.scale.y, obj.transform.scale.z);
      e.transform.setRotationEuler(obj.transform.rotation.x, obj.transform.rotation.y, obj.transform.rotation.z);
      if (obj.components.light) {
        const { Light } = await import('../scene/Light.js');
        const l = new Light(obj.components.light.type);
        l.color = obj.components.light.color;
        l.intensity = obj.components.light.intensity;
        l.direction = obj.components.light.direction;
        e.addComponent('light', l);
      }
      if (obj.components.meshRenderer) {
        const { Shader } = await import('../graphics/Shader.js');
        const { Material } = await import('../graphics/Material.js');
        const { MeshRenderer } = await import('../graphics/MeshRenderer.js');
        const { VS_PHONG, FS_PHONG } = await import('../graphics/shaders_phong.js');
        const { createCubeGeometry } = await import('../graphics/GeometryCube.js');
        const gl = engine.renderer.gl;
        const shader = new Shader(gl, VS_PHONG, FS_PHONG);
        const material = new Material(shader);
        const geometry = createCubeGeometry(gl);
        const mr = new MeshRenderer(gl, geometry, material);
        e.addComponent('meshRenderer', mr);
      }
      scene.add(e);
    }
  }
}
