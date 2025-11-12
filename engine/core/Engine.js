/**
 * Engine
 * --------------------------------------------------------------------
 * Role:
 * - Orchestrates Clock, Loop, Renderer, SceneManager, InputManager.
 * - Sets up a default Camera and a sample mesh for visual validation.
 *
 * Integration updates in this batch:
 * - Creates a Camera and assigns it to Renderer.
 * - Builds a basic colored triangle or quad mesh and adds it to the scene.
 * - Adds a simple AABB component to allow Raycaster selection.
 */
import { Clock } from './Clock.js';
import { Loop } from './Loop.js';
import { State } from './State.js';
import { Config } from './Config.js';
import { Scene } from '../scene/Scene.js';
import { SceneManager } from '../scene/SceneManager.js';
import { Renderer } from '../graphics/Renderer.js';
import { InputManager } from '../input/InputManager.js';
import { Camera } from '../scene/Camera.js';
import { Shader } from '../graphics/Shader.js';
import { Geometry } from '../graphics/Geometry.js';
import { Mesh } from '../graphics/Mesh.js';
import { Material } from '../graphics/Material.js';
import { VS_BASIC_COLOR, FS_BASIC_COLOR } from '../graphics/shaders.js';
import { Vector3 } from './Vector3.js';
import { Ray } from './Ray.js';
import { Raycaster } from '../physics/Raycaster.js';

export class Engine {
  constructor(canvas) {
    this.state = new State();
    this.clock = new Clock();
    this.sceneManager = new SceneManager();
    this.renderer = new Renderer(canvas, Config.renderer);
    this.input = new InputManager(canvas);

    // Create default scene and camera
    const scene = new Scene('DefaultScene');
    this.sceneManager.setActive(scene);

    this.camera = new Camera();
    this.camera.transform.setPosition(0, 2, 6);
    this.camera.target = new Vector3(0, 0, 0);
    this.renderer.camera = this.camera; // renderer needs camera

    // Raycaster for selection
    this.raycaster = new Raycaster();

    // Build a sample mesh (colored quad made of two triangles)
    const gl = this.renderer.gl;
    const shader = new Shader(gl, VS_BASIC_COLOR, FS_BASIC_COLOR);
    const material = new Material(shader);

    const s = 1; // half-size
    const vertices = [
      // x, y, z,   r, g, b
      -s, -s, 0,   1, 0, 0,
       s, -s, 0,   0, 1, 0,
       s,  s, 0,   0, 0, 1,
      -s,  s, 0,   1, 1, 0,
    ];
    const indices = [0,1,2,  0,2,3];

    const geometry = new Geometry(gl, { vertices, indices });
    const mesh = new Mesh(geometry, material);

    const quad = new (await import('../scene/Entity.js')).Entity('Quad');
    quad.addComponent('mesh', mesh);
    quad.transform.setPosition(0, 0, 0);
    // Add a simple AABB for selection (world-space bounds around the quad)
    quad.addComponent('aabb', {
      min: { x: -s, y: -s, z: -0.1 },
      max: { x:  s, y:  s, z:  0.1 }
    });
    scene.add(quad);

    // Loop: bind clock tick, update, and render
    this.loop = new Loop(() => {
      const dt = this.clock.tick();
      if (dt <= 0) return;
      this.update(dt);
      this.render();
    });

    // Selection via click: cast a ray and select entity
    canvas.addEventListener('click', (ev) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
      const ray = this._screenPointToRay(x, y);
      const hit = this.raycaster.cast(ray, this.sceneManager.active);
      if (hit) {
        this.sceneManager.events.emit('ui:select-entity', { entity: hit });
      }
    });
  }

  start() { this.clock.start(); this.loop.start(); }
  stop() { this.loop.stop(); this.clock.stop(); }

  update(dt) {
    // If you add orbit controls, use mouse drag deltas here.
    // Keeping minimal: only ensure camera matrices are up-to-date.
    this.camera.updateMatrices();

    const scene = this.sceneManager.active;
    for (const e of scene.entities) {
      if (!e.active) continue;
      // In a real engine, components would be updated here.
      if (e.transform._dirty) e.transform.updateMatrix();
    }
  }

  render() {
    const scene = this.sceneManager.active;
    this.renderer.render(scene);
  }

  /**
   * Convert normalized device coords (x,y in [-1,1]) into a world-space ray.
   * This minimal approach assumes a simple camera and ignores full inverse
   * projection*view math for brevity. We shoot a ray from camera position
   * towards the unprojected NDC direction on the near plane.
   */
  _screenPointToRay(ndcX, ndcY) {
    // Approximate ray direction in view space
    const fovRad = (this.camera.fov * Math.PI) / 180;
    const tan = Math.tan(fovRad / 2);
    const dirView = new Vector3(
      ndcX * this.camera.aspect * tan,
      ndcY * tan,
      -1
    ).normalize();

    // Convert view-space direction to world-space using camera basis
    // Reconstruct camera basis from view matrix (inverse of lookAt)
    const eye = this.camera.transform.position.clone();
    const target = this.camera.target.clone();
    const forward = target.clone().sub(eye).normalize();
    const right = forward.clone().cross(this.camera.up).normalize();
    const up = right.clone().cross(forward).normalize();

    const dirWorld = new Vector3(
      right.x * dirView.x + up.x * dirView.y + forward.x * dirView.z,
      right.y * dirView.x + up.y * dirView.y + forward.y * dirView.z,
      right.z * dirView.x + up.z * dirView.y + forward.z * dirView.z
    ).normalize();

    return new Ray(eye, dirWorld);
  }
}
