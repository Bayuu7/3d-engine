import { Raycaster } from '../engine/core/Raycaster.js';

/**
 * ViewportPicking
 * --------------------------------------------------------------------
 * - Click-select nearest entity using OBB (fallback AABB).
 */
export function enableViewportPicking(engine) {
  const canvas = engine.renderer.gl.canvas;
  const raycaster = new Raycaster(engine.camera);

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ray = raycaster.getRay(x, y, canvas);
    let closest = null;
    let bestT = Infinity;

    for (const ent of engine.sceneManager.active.entities) {
      const mr = ent.getComponent('meshRenderer');
      if (!mr || !ent.active || !mr.visible) continue;

      const hasRotation = (ent.transform.rotation.x !== 0 || ent.transform.rotation.y !== 0 || ent.transform.rotation.z !== 0);
      let tHit = null;

      if (hasRotation) {
        const obb = mr.getWorldOBB(ent.transform);
        tHit = obb.rayIntersect(ray);
      } else {
        const aabb = mr.getWorldAABB(ent.transform);
        tHit = raycaster.rayIntersectsAABB(ray, aabb);
      }

      if (tHit != null && tHit < bestT) {
        bestT = tHit;
        closest = ent;
      }
    }

    if (closest) engine.sceneManager.setSelected(closest);
  });
}
