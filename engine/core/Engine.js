import { Clock } from '../core/Clock.js';
import { Loop } from '../core/Loop.js';
import { State } from '../core/State.js';
import { Config } from '../core/Config.js';
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
import { VS_PHONG_TINT, FS_PHONG_TINT } from '../graphics/shaders_phong_tint.js';
import { createCubeGeometry } from '../graphics/GeometryCube.js';
import { createPlaneGeometry } from '../graphics/GeometryPlane.js';
import { Vector3 } from '../core/Vector3.js';
import { Entity } from '../scene/Entity.js';
import { PhysicsEngine } from '../physics/PhysicsEngine.js';
import { RigidBody } from '../physics/RigidBody.js';
import { Collider } from '../physics/Collider.js';
import { Frustum } from '../core/Frustum.js';
import { Matrix4 } from '../core/Matrix4.js';

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
    this.camera.transform.position.set(0, 4, 10);
    this.camera.target = new Vector3(0, 0, 0);
    this.renderer.camera = this.camera;

    // LightManager
    this.lightManager = new LightManager();
    const dirLightEntity = new Entity('DirLight');
    const dirLight = new Light('directional');
    dirLight.direction = new Vector3(-0.5, -1, -0.3);
    dirLight.color = [1,1,1];
    dirLight.intensity = 1.0;
    dirLightEntity.addComponent('light', dirLight);
    scene.add(dirLightEntity);
    this.lightManager.add(dirLight);

    const gl = this.renderer.gl;
    const shader = new Shader(gl, VS_PHONG_TINT, FS_PHONG_TINT);
    const material = new Material(shader);

    // Ground
    const groundGeometry = createPlaneGeometry(gl, 20);
    const groundRenderer = new MeshRenderer(gl, groundGeometry, material);
    const ground = new Entity('Ground');
    ground.addComponent('meshRenderer', groundRenderer);
    ground.addComponent('collider', new Collider('plane'));
    ground.transform.setPosition(0, 0, 0);
    scene.add(ground);

    // Animated cube
    const cubeGeom = createCubeGeometry(gl);
    const cubeRenderer = new MeshRenderer(gl, cubeGeom, material);
    const cube = new Entity('Cube');
    cube.addComponent('meshRenderer', cubeRenderer);
    cube.addComponent('rigidBody', new RigidBody(1));
    cube.transform.setPosition(0, 3, 0);
    scene.add(cube);

    // Physics
    this.physics = new PhysicsEngine();
    this.physics.world.addCollider(new Collider('plane'));

    // Culling helpers
    this._frustum = new Frustum();
    this._culledCount = 0;

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

    // Transforms and animation
    for (const e of scene.entities) {
      const animator = e.getComponent('animator');
      if (animator) animator.update(e, dt);

      if (!e.active) continue;
      if (e.transform._dirty) e.transform.updateMatrix();
    }

    // Physics
    this.physics.update(scene, dt);
  }

  render() {
    const scene = this.sceneManager.active;
    const gl = this.renderer.gl;
    const bg = scene.environment.backgroundColor;
    this.renderer.setClearColor(bg[0], bg[1], bg[2], bg[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Build view-projection and frustum
    const vp = new Matrix4().multiply(this.camera.projection, this.camera.view);
    this._frustum.setFromMatrix(vp);
    this._culledCount = 0;

    const dirLight = this.lightManager.getActiveLights()[0];

    for (const e of scene.entities) {
      const mr = e.getComponent('meshRenderer');
      if (!mr || !mr.visible) continue;

      const aabb = mr.getWorldAABB(e.transform);
      if (!this._frustum.boxInFrustum(aabb.min, aabb.max)) {
        this._culledCount++;
        continue;
      }

      mr.draw(
        e.transform.modelMatrix,
        this.camera.view,
        this.camera.projection,
        this.camera,
        dirLight,
        { selected: this.sceneManager.selected === e }
      );
    }
  }
}
