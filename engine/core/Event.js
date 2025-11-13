/**
 * Event class
 * Represents a generic event in the engine.
 * Used with EventEmitter for communication between subsystems.
 */
class Event {
  constructor(type, payload = {}) {
    // Type of the event (string identifier)
    this.type = type;
    // Payload data attached to the event
    this.payload = payload;

    // Boolean flag: event is valid
    this.isValid = true;
    // Boolean flag: event has been handled
    this.handled = false;
  }
}

export { Event };
