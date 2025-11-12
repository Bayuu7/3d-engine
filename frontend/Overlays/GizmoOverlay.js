import { createTransformGizmo } from '../Widgets/TransformGizmo.js';

/**
 * GizmoOverlay
 * --------------------------------------------------------------------
 * Role:
 * - Hosts transform gizmo overlay for selected entity.
 * - Provides API to set gizmo mode.
 */
export function createGizmoOverlay(root, engine) {
  const gizmo = createTransformGizmo(root, engine);
  engine.sceneManager.events.on('ui:set-gizmo-mode', ({ mode }) => {
    gizmo.setMode(mode);
  });
}
