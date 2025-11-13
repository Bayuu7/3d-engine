/**
 * EventEmitter class
 * Provides a publish/subscribe system for engine events.
 */
class EventEmitter {
  constructor() {
    // Map of event listeners
    this.listeners = {};

    // Boolean flag: emitter is active
    this.active = true;
    // Boolean flag: enable debug logging
    this.debugMode = false;
  }

  /**
   * Registers a listener for a specific event type.
   */
  on(type, callback) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);

    if (this.debugMode) {
      console.log(`[EventEmitter] Listener added for event: ${type}`);
    }
  }

  /**
   * Removes a listener for a specific event type.
   */
  off(type, callback) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter(cb => cb !== callback);

    if (this.debugMode) {
      console.log(`[EventEmitter] Listener removed for event: ${type}`);
    }
  }

  /**
   * Emits an event to all registered listeners.
   */
  emit(event) {
    if (!this.active || !this.listeners[event.type]) return;

    for (const callback of this.listeners[event.type]) {
      callback(event.payload);
    }

    event.handled = true;

    if (this.debugMode) {
      console.log(`[EventEmitter] Event emitted: ${event.type}`, event.payload);
    }
  }
}

export { EventEmitter };
