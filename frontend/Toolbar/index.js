import { enableCameraTool } from './CameraTool.js';
import { SaveManager } from '../../engine/save/SaveManager.js';

/**
 * Toolbar
 * --------------------------------------------------------------------
 * Role:
 * - Provides Play/Pause, Debug Overlay, Camera orbit toggle, Gizmo mode buttons, Save/Load.
 */
export function createToolbar(root, engine) {
  root.innerHTML = '';
  const saveManager = new SaveManager(engine);

  const playBtn = document.createElement('button');
  playBtn.className = 'btn';
  playBtn.textContent = 'Play';
  playBtn.onclick = () => {
    engine.state.playing = !engine.state.playing;
    playBtn.textContent = engine.state.playing ? 'Pause' : 'Play';
  };

  const debugBtn = document.createElement('button');
  debugBtn.className = 'btn';
  debugBtn.textContent = 'Debug Overlay';
  debugBtn.onclick = () => {
    engine.state.debugOverlay = !engine.state.debugOverlay;
  };

  const camBtn = document.createElement('button');
  camBtn.className = 'btn';
  camBtn.textContent = 'Camera Orbit';
  camBtn.onclick = () => {
    engine.camera.orbitEnabled = !engine.camera.orbitEnabled;
    if (engine.camera.orbitEnabled) {
      enableCameraTool(engine);
    }
  };

  const translateBtn = document.createElement('button');
  translateBtn.className = 'btn';
  translateBtn.textContent = 'Translate';
  translateBtn.onclick = () => {
    engine.sceneManager.events.emit('ui:set-gizmo-mode', { mode: 'translate' });
  };

  const rotateBtn = document.createElement('button');
  rotateBtn.className = 'btn';
  rotateBtn.textContent = 'Rotate';
  rotateBtn.onclick = () => {
    engine.sceneManager.events.emit('ui:set-gizmo-mode', { mode: 'rotate' });
  };

  const scaleBtn = document.createElement('button');
  scaleBtn.className = 'btn';
  scaleBtn.textContent = 'Scale';
  scaleBtn.onclick = () => {
    engine.sceneManager.events.emit('ui:set-gizmo-mode', { mode: 'scale' });
  };

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn';
  saveBtn.textContent = 'Save Scene';
  saveBtn.onclick = () => {
    saveManager.saveScene();
  };

  const loadBtn = document.createElement('button');
  loadBtn.className = 'btn';
  loadBtn.textContent = 'Load Scene';
  loadBtn.onclick = async () => {
    await saveManager.loadScene();
  };

  root.appendChild(playBtn);
  root.appendChild(debugBtn);
  root.appendChild(camBtn);
  root.appendChild(translateBtn);
  root.appendChild(rotateBtn);
  root.appendChild(scaleBtn);
  root.appendChild(saveBtn);
  root.appendChild(loadBtn);
}
