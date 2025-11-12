/**
 * TransformGizmo
 * --------------------------------------------------------------------
 * Role:
 * - Provides gizmo overlay for entity manipulation.
 * - Supports three modes: translate, rotate, scale.
 * - Draws axis handles and applies drag logic accordingly.
 *
 * Simplification:
 * - Overlay is 2D; we approximate axis handles.
 * - Rotation: dragging rotates around Y axis.
 * - Scale: dragging scales uniformly.
 */
export function createTransformGizmo(root, engine) {
  const overlay = document.createElement('canvas');
  overlay.width = root.clientWidth;
  overlay.height = root.clientHeight;
  overlay.style.position = 'absolute';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.pointerEvents = 'auto';
  root.appendChild(overlay);

  const ctx = overlay.getContext('2d');
  let selected = null;
  let dragging = false;
  let mode = 'translate'; // 'translate' | 'rotate' | 'scale'
  let lastX = 0, lastY = 0;

  function drawGizmo() {
    ctx.clearRect(0,0,overlay.width,overlay.height);
    if (!selected) return;
    const cx = overlay.width/2;
    const cy = overlay.height/2;
    ctx.lineWidth = 3;

    if (mode === 'translate') {
      ctx.strokeStyle = 'red'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+60,cy); ctx.stroke();
      ctx.strokeStyle = 'green'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx,cy-60); ctx.stroke();
      ctx.strokeStyle = 'blue'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx-60,cy); ctx.stroke();
    } else if (mode === 'rotate') {
      ctx.strokeStyle = 'orange';
      ctx.beginPath(); ctx.arc(cx,cy,50,0,2*Math.PI); ctx.stroke();
    } else if (mode === 'scale') {
      ctx.strokeStyle = 'purple';
      ctx.strokeRect(cx-40, cy-40, 80, 80);
    }
  }

  engine.sceneManager.events.on('ui:select-entity', ({ entity }) => {
    selected = entity;
    drawGizmo();
  });

  window.addEventListener('resize', () => {
    overlay.width = root.clientWidth;
    overlay.height = root.clientHeight;
    drawGizmo();
  });

  overlay.addEventListener('mousedown', (e) => {
    if (!selected) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  overlay.addEventListener('mouseup', () => {
    dragging = false;
  });

  overlay.addEventListener('mousemove', (e) => {
    if (!selected || !dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    const sens = 0.01;
    if (mode === 'translate') {
      selected.transform.position.x += dx * sens;
      selected.transform.position.y -= dy * sens;
    } else if (mode === 'rotate') {
      selected.transform.setRotationEuler(0, selected.transform.rotation.y + dx * sens * 50, 0);
    } else if (mode === 'scale') {
      const factor = 1 + dx * 0.01;
      selected.transform.setScale(
        selected.transform.scale.x * factor,
        selected.transform.scale.y * factor,
        selected.transform.scale.z * factor
      );
    }
    selected.transform.updateMatrix();
    drawGizmo();
  });

  // Expose mode toggle
  return {
    setMode: (m) => { mode = m; drawGizmo(); }
  };
}
