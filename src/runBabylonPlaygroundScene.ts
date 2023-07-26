import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Scene } from '@babylonjs/core/scene';

import '@babylonjs/core/Loading/loadingScreen';

export type CreateBabylonScene = (
  engine: Engine,
  canvasElement: HTMLCanvasElement,
) => Scene;

export function runBabylonPlaygroundScene(
  canvasElement: HTMLCanvasElement,
  createScene: CreateBabylonScene,
) {
  const engine = new Engine(canvasElement, true); // Generate the BABYLON 3D engine

  try {
    // TODO: does this even display? Can it be removed? I think it would be
    // better to use the HTML template's built-in fade in/out
    engine.displayLoadingUI();

    const scene = createScene(engine, canvasElement);

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

    // Only import hax if URL has ?hax
    const hax = new URLSearchParams(location.search).has('hax')
      ? import('./hax').then(({ attachHax }) => attachHax(scene))
      : null;

    return () => {
      console.log('Shutting down Babylon scene.');

      hax && hax.then(({ dispose }) => dispose());
      engine.stopRenderLoop();
      window.removeEventListener('resize', onWindowResized);
      scene.dispose();
      engine.dispose();
    };
  } finally {
    engine.hideLoadingUI();
  }
}

function createAndAddCameraToScene(canvas: HTMLCanvasElement, scene: Scene) {
  const camera = new ArcRotateCamera(
    'Camera',
    Math.PI / 6,
    Math.PI / 4,
    20,
    Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, false);
  camera.setTarget(Vector3.Zero());

  return camera;
}
