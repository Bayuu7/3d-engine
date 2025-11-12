/**
 * HierarchyPanel
 * --------------------------------------------------------------------
 * Role:
 * - Lists entities in the active scene and allows selection.
 *
 * Integration:
 * - Emits 'ui:select-entity' via engine.sceneManager.events when clicked.
 * - Inspector and GizmoOverlay listen to this event to update their views.
 */
export function createHierarchyPanel(root, engine) {
  const renderList = () => {
    root.innerHTML = '<div class="panel"><div class="section-title">Hierarchy</div></div>';
    const panel = root.querySelector('.panel');
    for (const e of engine.sceneManager.active.entities) {
      const item = document.createElement('div');
      item.className = 'item';
      item.textContent = e.name;
      item.onclick = () => {
        engine.sceneManager.events.emit('ui:select-entity', { entity: e });
      };
      panel.appendChild(item);
    }
  };

  renderList();

  // Re-render when the scene changes
  engine.sceneManager.events.on('scene:changed', renderList);
}
