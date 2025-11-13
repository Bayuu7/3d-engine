/**
 * TimelinePanel
 * --------------------------------------------------------------------
 * Role:
 * - Shows simple controls to play/pause and scrub animation time.
 * - Allows adding a sample position.x track to selected entity.
 */
export function createTimelinePanel(root, engine) {
  const state = { selected: null };

  function render() {
    root.innerHTML = '<div class="panel"><div class="section-title">Timeline</div></div>';
    const panel = root.querySelector('.panel');

    if (!state.selected) {
      panel.appendChild(document.createTextNode('No selection'));
      return;
    }

    const e = state.selected;
    const animator = e.getComponent('animator');

    const controls = document.createElement('div');
    controls.style.display = 'grid';
    controls.style.gap = '6px';
    controls.innerHTML = `
      <button class="btn" id="btnPlay">${animator && animator.playing ? 'Pause' : 'Play'}</button>
      <div>Time: <input type="range" id="timeRange" min="0" max="${animator ? animator.length : 5}" step="0.01" value="${animator ? animator.time.toFixed(2) : 0}"/></div>
      <button class="btn" id="btnAddTrack">Add sample track (pos.x)</button>
    `;
    panel.appendChild(controls);

    const btnPlay = controls.querySelector('#btnPlay');
    const timeRange = controls.querySelector('#timeRange');
    const btnAdd = controls.querySelector('#btnAddTrack');

    btnPlay.onclick = () => {
      let a = e.getComponent('animator');
      if (!a) {
        const { Animator } = engine.__imports.animation;
        a = new Animator(); e.addComponent('animator', a);
      }
      a.playing = !a.playing;
      render();
    };

    timeRange.oninput = (ev) => {
      let a = e.getComponent('animator');
      if (!a) {
        const { Animator } = engine.__imports.animation;
        a = new Animator(); e.addComponent('animator', a);
      }
      a.time = parseFloat(ev.target.value);
      a.playing = false;
      a.update(e, 0);
    };

    btnAdd.onclick = () => {
      const { Animator, KeyframeTrack } = engine.__imports.animation;
      let a = e.getComponent('animator');
      if (!a) { a = new Animator(); e.addComponent('animator', a); }
      const tr = new KeyframeTrack('transform.position.x', [0, 1, 2, 3, 4], [0, 1, -1, 2, 0]);
      a.addTrack(tr);
      a.playing = true;
      a.length = 4;
      render();
    };
  }

  engine.sceneManager.events.on('ui:select-entity', ({ entity }) => { state.selected = entity; render(); });
  render();
}
