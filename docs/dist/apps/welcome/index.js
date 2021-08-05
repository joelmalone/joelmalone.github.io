import * as BABYLON from '../../../_snowpack/pkg/@babylonjs/core/Legacy/legacy.js';
export function createScene(engine, canvasElement) {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4();
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 50, new BABYLON.Vector3(0, 0, 0), scene);
  camera.lowerBetaLimit = null;
  camera.upperBetaLimit = null;
  camera.attachControl(canvasElement, true);
  camera.speed = 1;
  camera.allowUpsideDown = true;
  const light = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(4, -4, 4), scene);
  light.groundColor = new BABYLON.Color3(1, 0.64, 0);
  light.intensity = 1; // scene.debugLayer.show();

  const shape = [new BABYLON.Vector3(2, -1, 0), new BABYLON.Vector3(4, -0.5, 0), new BABYLON.Vector3(4, 0.5, 0), new BABYLON.Vector3(2, 1, 0), new BABYLON.Vector3(2, -1, 0)];
  const lathe = BABYLON.MeshBuilder.CreateLathe('lathe', {
    shape,
    radius: 1,
    tessellation: 3,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
  });
  lathe.convertToFlatShadedMesh();
  scene.registerBeforeRender(function (...p) {
    lathe.rotation.x += 0.1 * engine.getDeltaTime() / 1000;
    lathe.rotation.y += 0.1 * engine.getDeltaTime() / 1000;
  });
  const lathe2 = BABYLON.MeshBuilder.CreateLathe('lathe2', {
    shape,
    radius: 3,
    tessellation: 3,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
  });
  lathe2.convertToFlatShadedMesh();
  scene.registerBeforeRender(function (...p) {
    lathe2.rotation.x += 0.1 * engine.getDeltaTime() / 1000;
    lathe2.rotation.y += 0.1 * engine.getDeltaTime() / -1000;
  });
  const lathe3 = BABYLON.MeshBuilder.CreateLathe('lathe3', {
    shape,
    radius: 9,
    tessellation: 3,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
  });
  lathe3.convertToFlatShadedMesh();
  scene.registerBeforeRender(function (...p) {
    lathe3.rotation.x += 0.1 * engine.getDeltaTime() / -1000;
    lathe3.rotation.y += 0.1 * engine.getDeltaTime() / 1000;
  });
  return scene;
}