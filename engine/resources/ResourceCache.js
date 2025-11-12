/**
 * ResourceCache
 * --------------------------------------------------------------------
 * Role:
 * - Simple in-memory cache for resources keyed by URL or id.
 */
export class ResourceCache {
  constructor() {
    this._map = new Map();
  }
  get(key) { return this._map.get(key) || null; }
  set(key, value) { this._map.set(key, value); return value; }
  has(key) { return this._map.has(key); }
  clear() { this._map.clear(); }
}
