/**
 * Logger
 * --------------------------------------------------------------------
 * Role:
 * - Minimal structured logger with levels and enable flags.
 *
 * Integration:
 * - Used across subsystems for consistent logging.
 */
export class Logger {
  constructor(namespace = 'app') {
    this.namespace = namespace;
    /** Toggle to enable/disable logs globally at runtime. */
    this.enabled = true;
    /** Current level threshold: 'debug' | 'info' | 'warn' | 'error' */
    this.level = 'debug';
    this._order = { debug: 0, info: 1, warn: 2, error: 3 };
  }
  _should(level) {
    if (!this.enabled) return false;
    return this._order[level] >= this._order[this.level];
  }
  debug(...args) { if (this._should('debug')) console.debug(`[${this.namespace}]`, ...args); }
  info(...args)  { if (this._should('info'))  console.info(`[${this.namespace}]`, ...args); }
  warn(...args)  { if (this._should('warn'))  console.warn(`[${this.namespace}]`, ...args); }
  error(...args) { if (this._should('error')) console.error(`[${this.namespace}]`, ...args); }
}
