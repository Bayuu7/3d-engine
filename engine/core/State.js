/**
 * State
 * --------------------------------------------------------------------
 * Role:
 * - Global flags and booleans controlling the engine/editor behavior.
 *
 * Typical flags:
 * - editorMode: true when UI editing is active; false could be runtime-only.
 * - playing: drives whether gameplay update logic should run.
 * - debugOverlay: toggles visual debug UI overlays.
 */
export class State {
  constructor() {
    /** Engine/editor mode flag; true when editor UI is active. */
    this.editorMode = true;
    /** Gameplay running flag; toggled by toolbar Play/Pause. */
    this.playing = false;
    /** Visual debug overlay toggle flag. */
    this.debugOverlay = true;
  }
}
