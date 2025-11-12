/**
 * Event
 * --------------------------------------------------------------------
 * Role:
 * - Lightweight event payload object (type + detail + timestamp).
 * - Useful for standardized payloads across subsystems.
 *
 * Integration:
 * - Used with EventEmitter (utils) to publish/sub events.
 */
export class Event {
  constructor(type, detail = {}) {
    /** Event type string (e.g., "input:key", "scene:changed"). */
    this.type = type;
    /** Arbitrary detail payload. */
    this.detail = detail;
    /** Creation timestamp in ms. */
    this.time = performance.now();
  }
}
