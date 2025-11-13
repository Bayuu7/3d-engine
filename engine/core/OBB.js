import { Vector3 } from './Vector3.js';

/**
 * OBB class (Oriented Bounding Box)
 * Represents a bounding box that can be rotated in 3D space.
 * More accurate than AABB for rotated objects.
 */
class OBB {
  constructor(center = new Vector3(), halfSizes = new Vector3(1, 1, 1), rotationMatrix = null) {
    this.center = center;          // Center of the box
    this.halfSizes = halfSizes;    // Half dimensions along each axis
    this.rotationMatrix = rotationMatrix; // Orientation of the box

    this.isValid = true;
    this.debugMode = false;
  }

  /**
   * Checks if a point is inside the OBB.
   */
  containsPoint(point) {
    // Transform point into local space of the OBB
    const local = new Vector3(
      point.x - this.center.x,
      point.y - this.center.y,
      point.z - this.center.z
    );

    // If rotationMatrix exists, apply inverse rotation
    if (this.rotationMatrix) {
      // Simplified: assume rotationMatrix has applyToVector3 method
      local = this.rotationMatrix.applyToVector3(local);
    }

    const inside =
      Math.abs(local.x) <= this.halfSizes.x &&
      Math.abs(local.y) <= this.halfSizes.y &&
      Math.abs(local.z) <= this.halfSizes.z;

    if (this.debugMode) {
      console.log('[OBB] Contains point?', inside);
    }

    return inside;
  }
}

export { OBB };
