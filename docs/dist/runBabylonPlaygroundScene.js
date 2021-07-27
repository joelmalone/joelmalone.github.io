import * as BABYLON from '../_snowpack/pkg/babylonjs/core/Legacy/legacy.js';
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
  // const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 100, BABYLON.Vector3.Zero(), scene);
  // camera.attachControl(canvas, true);
  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 20, -0.0001), scene); // Enable mouse wheel inputs.

  camera.inputs.addMouseWheel(); // Change the mouse wheel Y axis to controll the cameras height in the scene:
  //camera.inputs.attached["mousewheel"].wheelYMoveRelative = BABYLON.Coordinate.Y;
  // Revese the mouse wheel Y axis direction:
  // camera.inputs.attached["mousewheel"].wheelPrecisionY = -1;
  // This targets the camera to scene origin

  camera.setTarget(BABYLON.Vector3.Zero()); // TODO: setting the speed to 50 reduces the mouse drag look sensitivity
  // camera.speed = 50
  // This attaches the camera to the canvas

  camera.attachControl(false);
  return camera;
}