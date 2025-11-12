/**
 * MathUtils
 * --------------------------------------------------------------------
 * Role:
 * - Common math helpers (clamp, lerp, degrees/radians).
 *
 * Integration:
 * - Used by Transform and other math classes throughout the engine.
 */
export const MathUtils = {
  clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  },
  lerp(a, b, t) {
    return a + (b - a) * t;
  },
  degToRad(d) {
    return (d * Math.PI) / 180;
  },
  radToDeg(r) {
    return (r * 180) / Math.PI;
  }
};
