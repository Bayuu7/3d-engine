/**
 * InspectorPanel
 * --------------------------------------------------------------------
 * Role:
 * - Shows and edits properties of the selected entity.
 *
 * Integration:
 * - Listens to 'ui:select-entity' and updates UI accordingly.
 * - Mutations (e.g., position) write back to the entity's Transform.
 */
export function createInspectorPanel(root, engine) {
  const state = { selected: null };

  const render = () => {
    root.innerHTML = '<div class="panel"><div class="section-title">Inspector</div></div>';
    const panel = root.querySelector('.panel');

    if (!state.selected) {
      panel.appendChild(document.createTextNode('No selection'));
      return;
    }

    const e = state.selected;

    const pos = e.transform.position;
    const posRow = document.createElement('div');
    posRow.innerHTML = `
      <div>Position</div>
      <div>
        X: <input type="number" step="0.1" value="\${pos.x}"/>
        Y: <input type="number" step="0.1" value="\${pos.y}"/>
        Z: <input type="number" step="0.1" value="\${pos.z}"/>
      </div>
    `;
    const inputs = posRow.querySelectorAll('input');
    inputs[0].onchange = (ev) => { e.transform.setPosition(parseFloat(ev.target.value), pos.y, pos.z); };
    inputs[1].onchange = (ev) => { e.transform.setPosition(pos.x, parseFloat(ev.target.value), pos.z); };
    inputs[2].onchange = (ev) => { e.transform.setPosition(pos.x, pos.y, parseFloat(ev.target.value)); };
    panel.appendChild(posRow);

    const flagsRow = document.createElement('div');
    flagsRow.style.marginTop = '8px';
    flagsRow.innerHTML = `
      <div>Flags</div>
      <label><input type="checkbox" \${e.visible ? 'checked' : ''}/> Visible</label>
      <label><input type="checkbox" \${e.active ? 'checked' : ''}/> Active</label>
    `;
    const checkboxes = flagsRow.querySelectorAll('input[type="checkbox"]');
    checkboxes[0].onchange = (ev) => { e.visible = ev.target.checked; };
    checkboxes[1].onchange = (ev) => { e.active = ev.target.checked; };
    panel.appendChild(flagsRow);
  };

  engine.sceneManager.events.on('ui:select-entity', ({ entity }) => {
    state.selected = entity;
    render();
  });

  render();
}
