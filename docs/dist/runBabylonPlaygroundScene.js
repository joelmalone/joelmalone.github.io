import * as BABYLON from '../_snowpack/pkg/@babylonjs/core/Legacy/legacy.js';
export function runBabylonPlaygroundScene(canvasElement, createScene) {
  const engine = new BABYLON.Engine(canvasElement, true); // Generate the BABYLON 3D engine

  try {
    engine.displayLoadingUI();
    const scene = createScene(engine, canvasElement); //Call the createScene function

    var camera = scene.cameras[0] || createAndAddCameraToScene(canvasElement, scene); // Register a render loop to repeatedly render the scene

    engine.runRenderLoop(function () {
      scene.render();
    });

    function onWindowResized() {
      engine.resize();
    } // Watch for browser/canvas resize events


    window.addEventListener('resize', onWindowResized);
    return {
      engine,
      scene,
      dispose: () => {
        console.log('Shutting down Babylon scene.');
        engine.stopRenderLoop();
        window.removeEventListener('resize', onWindowResized);
        scene.dispose();
        engine.dispose();
      }
    };
  } finally {
    engine.hideLoadingUI();
  }
}

function createAndAddCameraToScene(canvas, scene) {
  const camera = new BABYLON.ArcRotateCamera('Camera', Math.PI / 6, Math.PI / 4, 20, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, false);
  camera.setTarget(BABYLON.Vector3.Zero());
  return camera;
}