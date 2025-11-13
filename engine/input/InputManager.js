/**
 * InputManager
 * --------------------------------------------------------------------
 * Role:
 * - Tracks keyboard and mouse state for the canvas element.
 */
export class InputManager {
  constructor(canvas) {
    this.dom = canvas;
    this.keys = new Set();
    this.mouse = { x:0, y:0, buttons:new Set() };

    window.addEventListener('keydown', (e) => this.keys.add(e.code));
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mousedown', (e) => this.mouse.buttons.add(e.button));
    canvas.addEventListener('mouseup',   (e) => this.mouse.buttons.delete(e.button));
  }

  isKeyDown(code) { return this.keys.has(code); }
  isMouseDown(button=0) { return this.mouse.buttons.has(button); }
}
