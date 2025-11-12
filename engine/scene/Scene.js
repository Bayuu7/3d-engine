/**
 * Scene
 * --------------------------------------------------------------------
 * Role:
 * - Holds a set of entities and scene-level environment settings.
 *
 * Integration:
 * - SceneManager makes one scene active; Renderer renders that active scene.
 * - Environment includes background color used by WebGL clear.
 */
export class Scene {
  constructor(name = 'UntitledScene') {
    this.name = name;
    /** Active entity set. */
    this.entities = new Set();
    /** Simple environment block. */
    this.environment = { backgroundColor: [0.1, 0.1, 0.12, 1.0] };
  }

  add(entity) {
    this.entities.add(entity);
    return entity;
  }

  remove(entity) {
    this.entities.delete(entity);
  }

  clear() {
    this.entities.clear();
  }
}
