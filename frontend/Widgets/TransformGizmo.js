/**
 * TransformGizmo
 * --------------------------------------------------------------------
 * Role:
 * - Draws 2D overlay gizmo and supports pick of X/Y axes by ray distance.
 * - Modes: translate, rotate, scale.
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
  let mode = 'translate';
  let lastX = 0, lastY = 0;
  let activeAxis = null; // 'x' | 'y' | 'z' | null

  function drawGizmo() {
    ctx.clearRect(0,0,overlay.width,overlay.height);
    if (!selected) return;
    const cx = overlay.width/2;
    const cy = overlay.height/2;
    ctx.lineWidth = 3;

    if (mode === 'translate') {
      ctx.strokeStyle = activeAxis==='x' ? '#ff8888' : 'red'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+60,cy); ctx.stroke();
      ctx.strokeStyle = activeAxis==='y' ? '#88ff88' : 'green'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx,cy-60); ctx.stroke();
      ctx.strokeStyle = activeAxis==='z' ? '#8888ff' : 'blue'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx-60,cy); ctx.stroke();
    } else if (mode === 'rotate') {
      ctx.strokeStyle = activeAxis ? '#ffaa66' : 'orange';
      ctx.beginPath(); ctx.arc(cx,cy,50,0,2*Math.PI); ctx.stroke();
    } else if (mode === 'scale') {
      ctx.strokeStyle = activeAxis ? '#cc88ff' : 'purple';
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

  // Axis picking using approximate screen-space distance to projected axes
  function pickAxis(x, y) {
    const cx = overlay.width/2;
    const cy = overlay.height/2;
    const hitRadius = 10;
    const dist = (x1,y1,x2,y2) => {
      const dx = x1-x2, dy = y1-y2;
      return Math.hypot(dx, dy);
    };
    const dx = dist(x,y,cx+60,cy);
    const dy = dist(x,y,cx,cy-60);
    const dz = dist(x,y,cx-60,cy);
    const min = Math.min(dx,dy,dz);
    if (min < hitRadius) {
      if (min === dx) return 'x';
      if (min === dy) return 'y';
      return 'z';
    }
    return null;
  }

  overlay.addEventListener('mousedown', (e) => {
    if (!selected) return;
    lastX = e.clientX;
    lastY = e.clientY;
    activeAxis = pickAxis(e.offsetX, e.offsetY);
    dragging = true;
    drawGizmo();
  });

  overlay.addEventListener('mouseup', () => {
    dragging = false;
    activeAxis = null;
    drawGizmo();
  });

  overlay.addEventListener('mousemove', (e) => {
    if (!selected || !dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    const sens = 0.01;
    if (mode === 'translate') {
      if (activeAxis === 'x') selected.transform.position.x += dx * sens;
      else if (activeAxis === 'y') selected.transform.position.y -= dy * sens;
      else if (activeAxis === 'z') selected.transform.position.z += -dx * sens;
    } else if (mode === 'rotate') {
      selected.transform.setRotationEuler(
        selected.transform.rotation.x,
        selected.transform.rotation.y + dx * sens * 50,
        selected.transform.rotation.z
      );
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

  return {
    setMode: (m) => { mode = m; drawGizmo(); }
  };
}
