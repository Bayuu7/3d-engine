import { Engine } from '../engine/core/Engine.js';
import { createToolbar } from '../frontend/Toolbar/index.js';
import { createHierarchyPanel } from '../frontend/Panels/HierarchyPanel.js';
import { createInspectorPanel } from '../frontend/Panels/InspectorPanel.js';
import { createGizmoOverlay } from '../frontend/Overlays/GizmoOverlay.js';
import { createDebugOverlay } from '../frontend/Overlays/DebugOverlay.js';
import { enableViewportPicking } from '../frontend/ViewportPicking.js';
import { createTimelinePanel } from '../frontend/Panels/TimelinePanel.js';

import { Animator } from '../engine/animation/Animator.js';
import { KeyframeTrack } from '../engine/animation/KeyframeTrack.js';

const canvas = document.getElementById('viewport');
const engine = new Engine(canvas);

// lightweight import registry for panels
engine.__imports = { animation: { Animator, KeyframeTrack } };

// Mount UI
createToolbar(document.getElementById('toolbar'), engine);
createHierarchyPanel(document.getElementById('hierarchy'), engine);
createInspectorPanel(document.getElementById('inspector'), engine);
createGizmoOverlay(document.getElementById('overlay'), engine);
createDebugOverlay(document.getElementById('overlay'), engine);
enableViewportPicking(engine);
createTimelinePanel(document.getElementById('inspector'), engine); // stacked under inspector

// Start
engine.start();
