/**
 * CameraTool
 * --------------------------------------------------------------------
 * Role:
 * - Enables orbit controls for the active camera using mouse drag.
 *
 * Integration:
 * - Listens to InputManager mouse events.
 * - Updates camera orbit angles in Engine.
 */
export function enableCameraTool(engine) {
  const input = engine.input;
  let dragging = false;
  let lastX = 0, lastY = 0;

  input.dom.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // left button
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });
  input.dom.addEventListener('mouseup', (e) => {
    if (e.button === 0) dragging = false;
  });
  input.dom.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    // Sensitivity factor
    const sens = 0.005;
    engine.camera.orbit(dx * sens, dy * sens);
  });

  // Scroll wheel for zoom
  input.dom.addEventListener('wheel', (e) => {
    engine.camera.orbit(0,0,e.deltaY*0.01);
  });
}
