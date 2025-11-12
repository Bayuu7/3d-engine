import { Clock } from './Clock.js';
import { Loop } from './Loop.js';
import { State } from './State.js';
import { Config } from './Config.js';
import { Scene } from '../scene/Scene.js';
import { SceneManager } from '../scene/SceneManager.js';
import { Renderer } from '../graphics/Renderer.js';
import { InputManager } from '../input/InputManager.js';
import { Camera } from '../scene/Camera.js';
import { Light } from '../scene/Light.js';
import { LightManager } from '../scene/LightManager.js';
import { Shader } from '../graphics/Shader.js';
import { Material } from '../graphics/Material.js';
import { MeshRenderer } from '../graphics/MeshRenderer.js';
import { VS_PHONG_MULTI, FS_PHONG_MULTI } from '../graphics/shaders_phong_multi.js';
import { createCubeGeometry } from '../graphics/GeometryCube.js';
import { createPlaneGeometry } from '../graphics/GeometryPlane.js';
import { Vector3 } from './Vector3.js';
import { Entity } from '../scene/Entity.js';
import { PhysicsEngine } from '../physics/PhysicsEngine.js';
import { RigidBody } from '../physics/RigidBody.js';
import { Collider } from '../physics/Collider.js';

export class Engine {
  constructor(canvas) {
    this.state = new State();
    this.clock = new Clock();
    this.sceneManager = new SceneManager();
    this.renderer = new Renderer(canvas, Config.renderer);
    this.input = new InputManager(canvas);

    const scene = new Scene('DefaultScene');
    this.sceneManager.setActive(scene);

    // Camera
    this.camera = new Camera();
    this.camera.transform.setPosition(0, 4, 10);
    this.camera.target = new Vector3(0, 0, 0);
    this.renderer.camera = this.camera;

    // LightManager
    this.lightManager = new LightManager();

    // Directional light
    const dirLightEntity = new Entity('DirLight');
    const dirLight = new Light('directional');
    dirLight.direction = new Vector3(-0.5, -1, -0.3);
    dirLight.color = [1,1,1];
    dirLight.intensity = 1.0;
    dirLightEntity.addComponent('light', dirLight);
    scene.add(dirLightEntity);
    this.lightManager.add(dirLight);

    // Cube entity with rigid body
    const gl = this.renderer.gl;
    const shader = new Shader(gl, VS_PHONG_MULTI, FS_PHONG_MULTI);
    const material = new Material(shader);
    const geometry = createCubeGeometry(gl);
    const cubeRenderer = new MeshRenderer(gl, geometry, material);

    const cube = new Entity('Cube');
    cube.addComponent('meshRenderer', cubeRenderer);
    cube.addComponent('rigidBody', new RigidBody(1));
    cube.transform.setPosition(0, 3, 0); // start above ground
    scene.add(cube);

    // Ground plane entity
    const groundGeometry = createPlaneGeometry(gl, 20);
    const groundRenderer = new MeshRenderer(gl, groundGeometry, material);
    const ground = new Entity('Ground');
    ground.addComponent('meshRenderer', groundRenderer);
    ground.addComponent('collider', new Collider('plane'));
    ground.transform.setPosition(0, 0, 0);
    scene.add(ground);

    // Physics engine
    this.physics = new PhysicsEngine();
    this.physics.world.addCollider(new Collider('plane'));

    // Main loop
    this.loop = new Loop(() => {
      const dt = this.clock.tick();
      if (dt <= 0) return;
      this.update(dt);
      this.render();
    });
  }

  start() { this.clock.start(); this.loop.start(); }
  stop() { this.loop.stop(); this.clock.stop(); }

  update(dt) {
    this.camera.updateMatrices();
    const scene = this.sceneManager.active;
    for (const e of scene.entities) {
      if (!e.active) continue;
      if (e.transform._dirty) e.transform.updateMatrix();
    }
    this.physics.update(scene, dt);
  }

  render() {
    const scene = this.sceneManager.active;
    const gl = this.renderer.gl;
    const bg = scene.environment.backgroundColor;
    this.renderer.setClearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const lights = this.lightManager.getActiveLights();
    for (const e of scene.entities) {
      const mr = e.getComponent('meshRenderer');
      if (mr && mr.visible) {
        mr.draw(
          e.transform.modelMatrix,
          this.camera.view,
          this.camera.projection,
          this.camera,
          lights
        );
      }
    }
  }
}
