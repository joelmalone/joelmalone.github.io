import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export type CreateBabylonScene = (
  engine: BABYLON.Engine,
  canvasElement: HTMLCanvasElement,
) => BABYLON.Scene;

export function runBabylonPlaygroundScene(
  canvasElement: HTMLCanvasElement,
  createScene: CreateBabylonScene,
) {
  const engine = new BABYLON.Engine(canvasElement, true); // Generate the BABYLON 3D engine

  try {
    engine.displayLoadingUI();

    const scene = createScene(engine, canvasElement); //Call the createScene function

    scene.cameras[0] || createAndAddCameraToScene(canvasElement, scene);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
      scene.render();
    });

    function onWindowResized() {
      engine.resize();
    }

    // Watch for browser/canvas resize events
    window.addEventListener('resize', onWindowResized);

    return () => {
      console.log('Shutting down Babylon scene.');

      engine.stopRenderLoop();
      window.removeEventListener('resize', onWindowResized);
      scene.dispose();
      engine.dispose();
    };
  } finally {
    engine.hideLoadingUI();
  }
}

function createAndAddCameraToScene(
  canvas: HTMLCanvasElement,
  scene: BABYLON.Scene,
) {
  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI / 6,
    Math.PI / 4,
    20,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, false);
  camera.setTarget(BABYLON.Vector3.Zero());

  return camera;
}
