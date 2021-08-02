import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export function createScene(
  engine: BABYLON.Engine,
  canvasElement: HTMLCanvasElement,
): BABYLON.Scene {
  const scene = new BABYLON.Scene(engine);

  scene.clearColor = new BABYLON.Color4();

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    0,
    Math.PI ,
    100,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvasElement, true);

  const light = new BABYLON.HemisphericLight(
    'hemi',
    new BABYLON.Vector3(4, -4, 4),
    scene,
  );
  light.groundColor = new BABYLON.Color3(1, 0.64, 0);
  light.intensity = 1;

  // scene.debugLayer.show();

  const shape = [
    new BABYLON.Vector3(2, 0, 0),
    new BABYLON.Vector3(4, 0.5, 0),
    new BABYLON.Vector3(4, 1.5, 0),
    new BABYLON.Vector3(2, 2, 0),
    new BABYLON.Vector3(2, 0, 0),
  ];

  const lathe = BABYLON.MeshBuilder.CreateLathe('lathe', {
    shape,
    radius: 1,
    tessellation: 3,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  });
  lathe.convertToFlatShadedMesh();

  scene.registerBeforeRender(function (...p) {
    lathe.rotation.x += (.1 * engine.getDeltaTime()) / 1000;
    lathe.rotation.y += (.1 * engine.getDeltaTime()) / 1000;
  });

  const lathe2 = BABYLON.MeshBuilder.CreateLathe('lathe2', {
    shape,
    radius: 3,
    tessellation: 3,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  });
  lathe2.convertToFlatShadedMesh();
  scene.registerBeforeRender(function (...p) {
    lathe2.rotation.x += (.1 * engine.getDeltaTime()) / 1000;
    lathe2.rotation.y += (.1 * engine.getDeltaTime()) / -1000;
  });

  const lathe3 = BABYLON.MeshBuilder.CreateLathe('lathe3', {
    shape,
    radius: 9,
    tessellation: 3,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  });
  lathe3.convertToFlatShadedMesh();
  scene.registerBeforeRender(function (...p) {
    lathe3.rotation.x += (.1 * engine.getDeltaTime()) / -1000;
    lathe3.rotation.y += (.1 * engine.getDeltaTime()) / 1000;
  });

  return scene;
}
