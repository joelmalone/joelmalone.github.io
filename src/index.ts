import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { runBabylonPlaygroundScene } from './runBabylonPlaygroundScene';

var babylon: ReturnType<typeof runBabylonPlaygroundScene> | null = null;

document.addEventListener('slide-activated', (ev) => {
  const canvas = (ev.target as HTMLElement).querySelector('canvas')!;
  const dataset = (ev as any).detail?.dataset;

  babylon?.dispose();
  babylon = null;
  babylon = runBabylonPlaygroundScene(canvas, (engine, canvas) => {
    console.log('Initialise scene with this data.', dataset);
    return createDemoScene(engine, canvas);
  });
});

document.addEventListener('slide-deactivated', (ev: any) => {
  babylon?.dispose();
  babylon = null;
});

function createDemoScene(
  engine: BABYLON.Engine,
  canvasElement: HTMLCanvasElement,
) {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    (3 * Math.PI) / 2,
    Math.PI / 4,
    40,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvasElement, true);

  const light = new BABYLON.HemisphericLight(
    'hemi',
    new BABYLON.Vector3(0, -1, 0),
    scene,
  );

  const mat = new BABYLON.StandardMaterial('mat', scene);
  mat.backFaceCulling = false; //Show all faces

  const myShape = [
    new BABYLON.Vector3(2, 0, 0),
    new BABYLON.Vector3(4, 0, 0),
    new BABYLON.Vector3(4, 1, 0),
    new BABYLON.Vector3(2, 1, 0),
  ];

  const lathe = BABYLON.MeshBuilder.CreateLathe('lathe', {
    shape: myShape,
    radius: 2,
    tessellation: 6,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  });
  lathe.convertToFlatShadedMesh();
  lathe.material = mat;

  return scene;
}
