/**
 * HierarchyPanel
 * --------------------------------------------------------------------
 * Role:
 * - Lists entities in active scene.
 * - Emits ui:select-entity when clicked.
 */
export function createHierarchyPanel(root, engine) {
  const render = () => {
    root.innerHTML = '<div class="panel"><div class="section-title">Hierarchy</div></div>';
    const panel = root.querySelector('.panel');

    const list = document.createElement('div');
    list.className = 'entity-list';
    for (const e of engine.sceneManager.active.entities) {
      const item = document.createElement('div');
      item.className = 'entity-item';
      item.textContent = e.name;
      item.onclick = () => engine.sceneManager.events.emit('ui:select-entity', { entity: e });
      list.appendChild(item);
    }
    panel.appendChild(list);
  };

  engine.sceneManager.events.on('scene:changed', render);
  render();
}
