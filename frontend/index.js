/**
 * Frontend Editor Entry
 * --------------------------------------------------------------------
 * Role:
 * - Bootstraps the Engine using the canvas element.
 * - Creates editor UI panels (Toolbar, Hierarchy, Inspector, GizmoOverlay).
 * - Demonstrates selection: clicking the viewport selects an entity with AABB.
 */
import { Engine, Entity } from '../engine/main.js';
import { createToolbar } from './Toolbar/index.js';
import { createHierarchyPanel } from './Panels/HierarchyPanel.js';
import { createInspectorPanel } from './Panels/InspectorPanel.js';
import { createGizmoOverlay } from './Overlays/GizmoOverlay.js';

const canvas = document.getElementById('viewport');
const engine = new Engine(canvas);

// Initialize UI panels
createToolbar(document.getElementById('toolbar'), engine);
createHierarchyPanel(document.getElementById('left'), engine);
createInspectorPanel(document.getElementById('right'), engine);
createGizmoOverlay(document.getElementById('overlay'), engine);

// Start the engine loop
engine.start();
