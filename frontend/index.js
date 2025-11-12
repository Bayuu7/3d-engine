/**
 * Frontend Editor Entry
 * --------------------------------------------------------------------
 * Role:
 * - Bootstraps the Engine using the canvas element.
 * - Creates editor UI panels (Toolbar, Hierarchy, Inspector, GizmoOverlay).
 * - Demonstrates selection events flowing from UI to engine systems.
 */
import { Engine, Entity } from '../engine/main.js';
import { createToolbar } from './Toolbar/index.js';
import { createHierarchyPanel } from './Panels/HierarchyPanel.js';
import { createInspectorPanel } from './Panels/InspectorPanel.js';
import { createGizmoOverlay } from './Overlays/GizmoOverlay.js';

const canvas = document.getElementById('viewport');
const engine = new Engine(canvas);

// Create a demo entity so the scene is not empty
const cube = new Entity('Cube');
cube.transform.setPosition(0, 0, 0);
engine.sceneManager.active.add(cube);

// Initialize UI panels
createToolbar(document.getElementById('toolbar'), engine);
createHierarchyPanel(document.getElementById('left'), engine);
createInspectorPanel(document.getElementById('right'), engine);
createGizmoOverlay(document.getElementById('overlay'), engine);

// Start the engine loop
engine.start();
