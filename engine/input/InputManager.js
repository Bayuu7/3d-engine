/**
 * InputManager
 * --------------------------------------------------------------------
 * Role:
 * - Aggregates keyboard/mouse input and emits events to consumers.
 *
 * Design:
 * - Stores current pressed keys and mouse state in simple structures.
 * - Emits 'input:key' and 'input:mouse' events via EventEmitter.
 *
 * Integration:
 * - Engine constructs InputManager with the canvas DOM element.
 * - UI tools (e.g., selection, camera) listen to these events.
 */
import { EventEmitter } from '../utils/EventEmitter.js';

export class InputManager {
  constructor(dom) {
    this.events = new EventEmitter();
    this.dom = dom;

    // Simple input state objects
    this.keys = new Set();
    this.mouse = { x: 0, y: 0, buttons: new Set() };

    // Keyboard listeners
    dom.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
      this.events.emit('input:key', e);
    });
    dom.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      this.events.emit('input:key', e);
    });

    // Mouse listeners
    dom.addEventListener('mousedown', (e) => {
      this.mouse.buttons.add(e.button);
      this.events.emit('input:mouse', e);
    });
    dom.addEventListener('mouseup', (e) => {
      this.mouse.buttons.delete(e.button);
      this.events.emit('input:mouse', e);
    });
    dom.addEventListener('mousemove', (e) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.events.emit('input:mouse', e);
    });
  }
}
