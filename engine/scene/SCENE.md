# DSRT Engine – Scene Modules

The `engine/scene/` directory contains the **scene graph system** of the DSRT Engine.  
These modules define entities, components, transforms, cameras, lights, sprites, text, and UI elements.  
Together, they form the hierarchical structure that represents everything visible and interactive in a 2D/3D world.

---

## 📂 Module Flow

### 1. Core Building Blocks
- **Entity.js**  
  Fundamental scene object. Holds a `Transform`, a list of `Component`s, and child entities.  
  Provides update recursion across components and children.  
  Flags: `active`, `debugMode`.

- **Component.js**  
  Base class for extending entity behavior (e.g., renderable, physics body, script).  
  Lifecycle hooks: `onInit`, `onUpdate`, `onDestroy`.  
  Flags: `enabled`, `initialized`, `debugMode`.

- **Transform.js**  
  Holds position, rotation, and scale. Composes a `Matrix4` for rendering and physics.  
  Flags: `dirty`, `debugMode`.

---

### 2. Scene Management
- **Scene.js**  
  Holds root entities and manages hierarchical updates.  
  Flags: `active`, `debugMode`.

- **SceneManager.js**  
  Manages multiple scenes, handles activation, loading, and transitions.  
  Flags: `debugMode`.

---

### 3. Cameras & Lights
- **Camera.js**  
  Specialized entity providing view and projection matrices.  
  Integrates with renderer to set viewpoint.  
  Flags: `dirty`, `debugMode`.

- **Light.js**  
  Scene entity that emits light (directional, point, spot).  
  Flags: `enabled`, `debugMode`.

- **LightManager.js**  
  Manages multiple lights in a scene. Provides queries for renderer.  
  Flags: `debugMode`.

---

### 4. Renderable 2D Entities
- **Sprite.js**  
  2D renderable entity with texture, color, and layer.  
  Flags: `visible`, `debugMode`.

- **Text.js**  
  2D text entity with font, content, size, and alignment.  
  Flags: `visible`, `debugMode`.

- **UIElement.js**  
  2D UI entity (button, panel, slider) with layout properties.  
  Flags: `visible`, `interactable`, `debugMode`.

---

### 5. Advanced Scene Features
- **Node.js**  
  Generic graph node for hierarchical scene structures.  
  Flags: `active`, `debugMode`.

- **Prefab.js**  
  Defines reusable entity templates.  
  Flags: `debugMode`.

- **Environment.js**  
  Holds global scene settings (skybox, ambient light, fog).  
  Flags: `debugMode`.

- **LOD.js**  
  Level of Detail system for performance optimization.  
  Flags: `debugMode`.

- **LayerMask.js**  
  Defines layers for rendering and collision filtering.  
  Flags: `debugMode`.

- **Visibility.js**  
  Controls visibility of entities based on camera frustum or custom rules.  
  Flags: `visible`, `debugMode`.

---

## 🔄 Current Stage

At this stage, the scene modules provide:
- Entity/component system with transforms.
- Scene graph with hierarchical updates.
- Cameras and lights for rendering.
- Basic 2D renderables (sprites, text, UI).
- Scene manager for switching between scenes.

This is sufficient to build interactive 2D/3D worlds and integrate with graphics and physics subsystems.

---

## 🚀 Next Steps (Scene Extensions)

To reach **maximal scene functionality**, the following additions are planned:

1. **Prefab & Node System**  
   - Support for reusable prefabs and dynamic instantiation.  
   - Node-based scene editing for complex hierarchies.

2. **Environment & Lighting**  
   - Advanced environment settings (HDR skybox, fog, ambient occlusion).  
   - LightManager integration with renderer for shadow maps.

3. **LOD & Visibility**  
   - Level of Detail switching for performance.  
   - Visibility culling based on camera frustum.

4. **Layer & Masking**  
   - LayerMask integration for selective rendering and collision filtering.

---

## 📌 Roadmap to Maximal Scene

- **Phase 1 (Current)**: Entities, components, transforms, scene graph, cameras, lights, sprites, text, UI.  
- **Phase 2 (Upcoming)**: Prefabs, environment settings, light management.  
- **Phase 3 (Extended)**: LOD, visibility culling, layer masks.  
- **Phase 4 (Maximal)**: Fully integrated scene system with editor support, prefabs, advanced lighting, and performance optimizations.

---

## 🧭 Summary

The `scene/` folder defines the **hierarchical world representation** of DSRT Engine.  
By progressively extending the scene system with prefabs, environment, lighting, and performance features, DSRT will evolve into a **maximal scene graph** capable of supporting advanced real-time applications in both 2D and 3D.
