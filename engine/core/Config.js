/**
 * Config
 * --------------------------------------------------------------------
 * Role:
 * - Centralized configuration for engine systems.
 *
 * Integration:
 * - Renderer, physics, input, etc. read and adjust behavior from here.
 */
export const Config = {
  renderer: {
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: false
  },
  scene: {
    maxEntities: 100000
  },
  input: {
    mouseSensitivity: 1.0
  }
};
