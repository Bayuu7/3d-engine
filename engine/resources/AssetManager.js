/**
 * AssetManager
 * --------------------------------------------------------------------
 * Role:
 * - Central place to load and cache assets (textures, models, audio).
 *
 * Integration:
 * - Frontend/editor can request assets to be loaded and reused.
 */
import { ResourceCache } from './ResourceCache.js';

export class AssetManager {
  constructor() {
    this.cache = new ResourceCache();
  }

  /** Generic loader with caching wrapper. */
  async load(key, loaderFn) {
    if (this.cache.has(key)) return this.cache.get(key);
    const asset = await loaderFn();
    this.cache.set(key, asset);
    return asset;
  }
}
