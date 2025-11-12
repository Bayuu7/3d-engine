/**
 * EventEmitter
 * --------------------------------------------------------------------
 * Role:
 * - Lightweight pub/sub mechanism to decouple subsystems.
 *
 * Design:
 * - Map of event type -> Set of listener functions.
 * - Listener signature: (evtOrDetail) => void
 * - We do not enforce a strict Event object; plain objects are fine.
 *
 * Integration:
 * - Engine, SceneManager, InputManager, UI panels rely on events.
 * - Keeps editor selections and engine actions in sync.
 */
export class EventEmitter {
  constructor() {
    /** Map of type => Set<Function> listeners. */
    this._map = new Map();
  }

  /** Registers a listener for a specific type; returns an unsubscribe fn. */
  on(type, fn) {
    if (!this._map.has(type)) this._map.set(type, new Set());
    this._map.get(type).add(fn);
    return () => this.off(type, fn);
  }

  /** Removes a specific listener for a type. */
  off(type, fn) {
    const set = this._map.get(type);
    if (set) set.delete(fn);
  }

  /** Emits a payload to all listeners of the given type. */
  emit(type, evt) {
    const set = this._map.get(type);
    if (!set) return;
    for (const fn of set) {
      try { fn(evt); } catch (e) { console.error('EventEmitter handler error', e); }
    }
  }

  /** Clears all listener registrations. */
  clear() {
    this._map.clear();
  }
}
