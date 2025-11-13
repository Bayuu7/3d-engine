# DSRT Engine – Core Modules

The `engine/core/` folder contains the **fundamental building blocks** of the DSRT Engine.  
These modules provide math utilities, bounding volumes, timing, event systems, and the main engine loop.  
Every other subsystem (scene, graphics, physics, audio, frontend/editor) depends on these core abstractions.

---

## 📂 Current Modules Overview

### Math & Vectors
- **Vector2.js / Vector3.js / Vector4.js**  
  Represent 2D, 3D, and 4D vectors. Provide operations such as addition, subtraction, dot product, cross product, and normalization.  
  Flags: `isValid`, `debugMode`.

- **Matrix3.js**  
  3×3 matrix for 2D transformations (translation, rotation, scaling).  
  Used by sprites, text, and UI elements.

- **Matrix4.js**  
  4×4 matrix for 3D transformations.  
  Used by entities, cameras, and lights. Supports composition from position, quaternion, and scale.

- **Quaternion.js**  
  Represents 3D rotations. Converts to/from axis-angle and integrates with `Matrix4`.

- **Color.js**  
  RGBA color representation with utilities for RGB/HEX conversion.

---

### Bounding Volumes
- **BoundingBox.js**  
  Axis-aligned bounding box (AABB). Used for collision detection, frustum culling, and spatial partitioning.

- **BoundingSphere.js**  
  Sphere volume for fast broadphase collision checks.

- **OBB.js**  
  Oriented bounding box. More accurate than AABB for rotated objects.

- **Ray.js**  
  Represents a ray with origin and direction. Used in raycasting.

- **Raycaster.js**  
  Casts rays into the scene to detect intersections with bounding volumes.

---

### Engine Control
- **Clock.js**  
  Provides timing functionality. Calculates delta time and elapsed time.

- **Loop.js**  
  Manages the main update/render loop. Integrates with `Engine` and uses `Clock`.

- **Engine.js**  
  Entry point of the DSRT Engine. Initializes subsystems, starts/stops the loop, and coordinates update/render calls.

- **State.js**  
  Tracks engine state (`running`, `paused`, `stopped`).

- **Config.js**  
  Global configuration object (debug flags, target FPS, rendering options).

---

### Events
- **Event.js**  
  Represents a generic event with type and payload.

- **EventEmitter.js**  
  Provides a publish/subscribe system for communication between subsystems.

---

## 🔄 Current Stage

At this stage, the core modules provide:
- Basic math (vectors, matrices, quaternions).
- Bounding volumes for collision and raycasting.
- Timing and loop management.
- Engine state and configuration.
- Event system for communication.

This is sufficient to bootstrap the engine and integrate with scene, graphics, and physics subsystems.

---

## 🚀 Next Steps (Core Extensions)

To reach **maximal core functionality**, the following additions are planned:

1. **Math Utilities**  
   - `MathUtils.js` (clamp, lerp, degToRad, randomRange).  
   - `ColorUtils.js` (color conversions).

2. **Performance & Debugging**  
   - `PerformanceMonitor.js` (CPU/GPU profiling).  
   - `FrameLimiter.js` (FPS control).  
   - `CrashHandler.js` (runtime error capture).

3. **Security**  
   - `SecurityManager.js` (sandboxing scripts, validating resources).  
   - `SecurityAudit.js` (logging unsafe operations).

4. **Integration Hooks**  
   - Ensure all bounding volumes integrate with `PhysicsEngine`.  
   - Ensure `Raycaster` integrates with `SceneManager` and `SelectionTool`.  
   - Ensure `Loop` integrates with `Playground` for live editing.

---

## 📌 Roadmap to Maximal Core

- **Phase 1 (Current)**: Math, bounding volumes, engine loop, events.  
- **Phase 2 (Upcoming)**: Utilities, debugging overlays, performance monitoring.  
- **Phase 3 (Extended)**: Security modules, advanced math (spatial partitioning, BVH).  
- **Phase 4 (Maximal)**: Fully integrated core with scene, physics, graphics, audio, and editor. Provides a stable foundation for DSRT as a complete 2D/3D engine.

---

## Structure Planning

engine/scene/
├─ core/                      # Core building blocks
│  ├─ Entity.js
│  ├─ Component.js
│  ├─ Transform.js
│  ├─ Node.js
│  └─ index.js
├─ management/                # Scene lifecycle
│  ├─ Scene.js
│  ├─ SceneManager.js
│  └─ index.js
├─ cameras-lights/            # Cameras and Lights
│  ├─ Camera.js
│  ├─ Light.js
│  ├─ LightManager.js
│  └─ index.js
├─ renderables/               # 2D/3D renderable entities
│  ├─ Sprite.js
│  ├─ Text.js
│  ├─ UIElement.js
│  └─ index.js
├─ advanced/                  # Advanced features
│  ├─ Prefab.js
│  ├─ Environment.js
│  ├─ LOD.js
│  ├─ LayerMask.js
│  ├─ Visibility.js
│  └─ index.js
├─ constants/                 # Scene-wide constants
│  └─ SceneConstants.js
├─ utils/                     # Helper functions for scene
│  └─ SceneUtils.js
└─ index.js                   # Central entry point

## 🧭 Summary

The `core/` folder is the **foundation** of DSRT Engine.  
Every subsystem builds on these modules. By progressively extending the core with utilities, debugging, and security, DSRT will evolve into a **maximal engine core** capable of supporting advanced real-time
applications.
