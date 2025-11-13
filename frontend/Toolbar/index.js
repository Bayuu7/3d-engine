import { enableCameraTool } from './CameraTool.js';
import { SaveManager } from '../../engine/save/SaveManager.js';
import { GLTFLoader } from '../../engine/resources/GLTFLoader.js';
import { Shader } from '../../engine/graphics/Shader.js';
import { Material } from '../../engine/graphics/Material.js';
import { VS_LAMBERT_TEX, FS_LAMBERT_TEX } from '../../engine/graphics/shaders_lambert_tex.js';
import { MeshRenderer } from '../../engine/graphics/MeshRenderer.js';
import { Entity } from '../../engine/scene/Entity.js';

/**
 * Toolbar
 * --------------------------------------------------------------------
 * Role:
 * - Play/Pause, Debug Overlay, Camera orbit, Gizmo modes, Save/Load, GLTF Load.
 */
export function createToolbar(root, engine) {
  root.innerHTML = '';
  const saveManager = new SaveManager(engine);

  const mkBtn = (label, onClick) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = label;
    b.onclick = onClick;
    return b;
  };

  const playBtn = mkBtn('Play', () => {
    engine.state.playing = !engine.state.playing;
    playBtn.textContent = engine.state.playing ? 'Pause' : 'Play';
  });

  const debugBtn = mkBtn('Debug Overlay', () => {
    engine.state.debugOverlay = !engine.state.debugOverlay;
  });

  const camBtn = mkBtn('Camera Orbit', () => {
    engine.camera.orbitEnabled = !engine.camera.orbitEnabled;
    if (engine.camera.orbitEnabled) enableCameraTool(engine);
  });

  const translateBtn = mkBtn('Translate', () => {
    engine.sceneManager.events.emit('ui:set-gizmo-mode', { mode: 'translate' });
  });
  const rotateBtn = mkBtn('Rotate', () => {
    engine.sceneManager.events.emit('ui:set-gizmo-mode', { mode: 'rotate' });
  });
  const scaleBtn = mkBtn('Scale', () => {
    engine.sceneManager.events.emit('ui:set-gizmo-mode', { mode: 'scale' });
  });

  const saveBtn = mkBtn('Save Scene', () => saveManager.saveScene());
  const loadBtn = mkBtn('Load Scene', async () => { await saveManager.loadScene(); });

  const gltfBtn = mkBtn('Load GLTF', async () => {
    const url = prompt('Enter GLTF URL (same-origin or CORS-enabled):', './assets/Duck.gltf');
    if (!url) return;
    const gl = engine.renderer.gl;
    const loader = new GLTFLoader(gl);
    try {
      const { geometry, baseColorTex } = await loader.loadFromUrl(url);
      const shader = new Shader(gl, VS_LAMBERT_TEX, FS_LAMBERT_TEX);
      const material = new Material(shader);
      material.baseColorTex = baseColorTex;

      // Use existing directional light from scene (first light entity)
      const dirLightEntity = engine.sceneManager.active.entities.find(e => e.name === 'DirLight');
      const dirLight = dirLightEntity ? dirLightEntity.getComponent('light') : null;

      const mr = new MeshRenderer(gl, geometry, material);
      const ent = new Entity('GLTFModel');
      ent.addComponent('meshRenderer', mr);
      ent.transform.setPosition(0, 0, 0);
      engine.sceneManager.active.add(ent);

      alert('GLTF model loaded.');
    } catch (err) {
      console.error(err);
      alert('Failed to load GLTF: ' + err.message);
    }
  });

  root.appendChild(playBtn);
  root.appendChild(debugBtn);
  root.appendChild(camBtn);
  root.appendChild(translateBtn);
  root.appendChild(rotateBtn);
  root.appendChild(scaleBtn);
  root.appendChild(saveBtn);
  root.appendChild(loadBtn);
  root.appendChild(gltfBtn);
}
