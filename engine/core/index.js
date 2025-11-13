/**
 * Core index.js
 * Barrel file that re-exports all core modules.
 * This allows other parts of the engine to import from 'engine/core' directly.
 */

// Math & Vectors
export { Vector2 } from './Vector2.js';
export { Vector3 } from './Vector3.js';
export { Vector4 } from './Vector4.js';
export { Matrix3 } from './Matrix3.js';
export { Matrix4 } from './Matrix4.js';
export { Quaternion } from './Quaternion.js';
export { Color } from './Color.js';

// Bounding volumes
export { BoundingBox } from './BoundingBox.js';
export { BoundingSphere } from './BoundingSphere.js';
export { OBB } from './OBB.js';
export { Ray } from './Ray.js';
export { Raycaster } from './Raycaster.js';

// Engine control
export { Clock } from './Clock.js';
export { Loop } from './Loop.js';
export { Engine } from './Engine.js';
export { State } from './State.js';
export { Config } from './Config.js';

// Events
export { Event } from './Event.js';
export { EventEmitter } from './EventEmitter.js';
