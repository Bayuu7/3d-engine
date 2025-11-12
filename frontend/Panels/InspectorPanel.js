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

    // Transform position
    const pos = e.transform.position;
    const posRow = document.createElement('div');
    posRow.innerHTML = `
      <div>Position</div>
      <div>
        X: <input type="number" step="0.1" value="${pos.x}"/>
        Y: <input type="number" step="0.1" value="${pos.y}"/>
        Z: <input type="number" step="0.1" value="${pos.z}"/>
      </div>
    `;
    const inputs = posRow.querySelectorAll('input');
    inputs[0].onchange = (ev) => { e.transform.setPosition(parseFloat(ev.target.value), pos.y, pos.z); };
    inputs[1].onchange = (ev) => { e.transform.setPosition(pos.x, parseFloat(ev.target.value), pos.z); };
    inputs[2].onchange = (ev) => { e.transform.setPosition(pos.x, pos.y, parseFloat(ev.target.value)); };
    panel.appendChild(posRow);

    // RigidBody component
    const rb = e.getComponent('rigidBody');
    if (rb) {
      const rbRow = document.createElement('div');
      rbRow.style.marginTop = '12px';
      rbRow.innerHTML = `
        <div>RigidBody</div>
        <div>Mass: <input type="number" step="0.1" value="${rb.mass}"/></div>
        <div><label><input type="checkbox" ${rb.useGravity?'checked':''}/> Use Gravity</label></div>
        <div><label><input type="checkbox" ${rb.isKinematic?'checked':''}/> Is Kinematic</label></div>
      `;
      const inputs = rbRow.querySelectorAll('input');
      inputs[0].onchange = (ev) => { rb.mass = parseFloat(ev.target.value); };
      inputs[1].onchange = (ev) => { rb.useGravity = ev.target.checked; };
      inputs[2].onchange = (ev) => { rb.isKinematic = ev.target.checked; };
      panel.appendChild(rbRow);
    }

    // Light component
    const light = e.getComponent('light');
    if (light) {
      const lightRow = document.createElement('div');
      lightRow.style.marginTop = '12px';
      lightRow.innerHTML = `
        <div>Light</div>
        <div>
          Color: R <input type="number" step="0.1" min="0" max="1" value="${light.color[0]}"/>
                 G <input type="number" step="0.1" min="0" max="1" value="${light.color[1]}"/>
                 B <input type="number" step="0.1" min="0" max="1" value="${light.color[2]}"/>
        </div>
        <div>
          Intensity: <input type="number" step="0.1" value="${light.intensity}"/>
        </div>
        <div>
          Direction: X <input type="number" step="0.1" value="${light.direction.x}"/>
                     Y <input type="number" step="0.1" value="${light.direction.y}"/>
                     Z <input type="number" step="0.1" value="${light.direction.z}"/>
        </div>
      `;
      const inputs = lightRow.querySelectorAll('input');
      inputs[0].onchange = (ev) => { light.color[0] = parseFloat(ev.target.value); };
      inputs[1].onchange = (ev) => { light.color[1] = parseFloat(ev.target.value); };
      inputs[2].onchange = (ev) => { light.color[2] = parseFloat(ev.target.value); };
      inputs[3].onchange = (ev) => { light.intensity = parseFloat(ev.target.value); };
      inputs[4].onchange = (ev) => { light.direction.x = parseFloat(ev.target.value); };
      inputs[5].onchange = (ev) => { light.direction.y = parseFloat(ev.target.value); };
      inputs[6].onchange = (ev) => { light.direction.z = parseFloat(ev.target.value); };
      panel.appendChild(lightRow);
    }
  };

  engine.sceneManager.events.on('ui:select-entity', ({ entity }) => {
    state.selected = entity;
    render();
  });

  render();
}
