/**
 * CameraTool
 * --------------------------------------------------------------------
 * Role:
 * - Enables orbit controls with mouse drag.
 */
export function enableCameraTool(engine){
  const canvas = engine.renderer.gl.canvas;
  let dragging=false, lastX=0,lastY=0;
  canvas.addEventListener('mousedown',(e)=>{ dragging=true; lastX=e.clientX; lastY=e.clientY; });
  canvas.addEventListener('mouseup',()=>{ dragging=false; });
  canvas.addEventListener('mousemove',(e)=>{
    if (!dragging) return;
    const dx=e.clientX-lastX, dy=e.clientY-lastY;
    lastX=e.clientX; lastY=e.clientY;
    engine.camera.orbitTheta += dx*0.01;
    engine.camera.orbitPhi += dy*0.01;
    if (engine.camera.orbitPhi<0.1) engine.camera.orbitPhi=0.1;
    if (engine.camera.orbitPhi>Math.PI-0.1) engine.camera.orbitPhi=Math.PI-0.1;
  });
}
