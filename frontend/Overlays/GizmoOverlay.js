/**
 * GizmoOverlay
 * --------------------------------------------------------------------
 * Role:
 * - Shows a simple debug overlay (e.g., label for selected entity).
 *
 * Integration:
 * - Reads engine.state.debugOverlay for visibility.
 * - Reacts to "ui:select-entity" to show the selected name.
 */
export function createGizmoOverlay(root, engine) {
  const overlay = document.createElement('div');
  overlay.style.pointerEvents = 'none';
  overlay.style.position = 'absolute';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  root.appendChild(overlay);

  let selected = null;

  const render = () => {
    overlay.innerHTML = '';
    if (!engine.state.debugOverlay) return;
    if (!selected) return;
    const tag = document.createElement('div');
    tag.style.position = 'absolute';
    tag.style.left = '10px';
    tag.style.top = '10px';
    tag.style.background = 'rgba(0,0,0,0.6)';
    tag.style.padding = '6px 10px';
    tag.style.borderRadius = '4px';
    tag.textContent = \`Selected: \${selected.name}\`;
    overlay.appendChild(tag);
  };

  engine.sceneManager.events.on('ui:select-entity', ({ entity }) => {
    selected = entity;
    render();
  });

  // Refresh when clicking (simple way to update after changes)
  document.addEventListener('click', render);
}
