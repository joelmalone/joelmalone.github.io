import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';

// Import components as per https://doc.babylonjs.com/setup/frameworkPackages/es6Support
import "@babylonjs/core/Materials/standardMaterial";

export function createScene(
  engine: Engine,
  canvasElement: HTMLCanvasElement,
): Scene {
  const scene = new Scene(engine);

  scene.clearColor = new Color4();

  const camera = new ArcRotateCamera(
    'Camera',
    0,
    0,
    50,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.lowerBetaLimit = null!;
  camera.upperBetaLimit = null!;
  camera.attachControl(canvasElement, true);
  camera.speed = 1;
  camera.allowUpsideDown = true;

  const light = new HemisphericLight('hemi', new Vector3(4, -4, 4), scene);
  light.groundColor = new Color3(1, 0.64, 0);
  light.intensity = 1;

  // scene.debugLayer.show();

  const shape = [
    new Vector3(2, -1, 0),
    new Vector3(4, -0.5, 0),
    new Vector3(4, 0.5, 0),
    new Vector3(2, 1, 0),
    new Vector3(2, -1, 0),
  ];

  const lathe = MeshBuilder.CreateLathe('lathe', {
    shape,
    radius: 1,
    tessellation: 3,
    sideOrientation: Mesh.DOUBLESIDE,
  });
  lathe.convertToFlatShadedMesh();
  scene.registerBeforeRender(function () {
    lathe.rotation.x += (0.1 * engine.getDeltaTime()) / 1000;
    lathe.rotation.y += (0.1 * engine.getDeltaTime()) / 1000;
  });

  const lathe2 = MeshBuilder.CreateLathe('lathe2', {
    shape,
    radius: 3,
    tessellation: 3,
    sideOrientation: Mesh.DOUBLESIDE,
  });
  lathe2.convertToFlatShadedMesh();
  scene.registerBeforeRender(function () {
    lathe2.rotation.x += (0.1 * engine.getDeltaTime()) / 1000;
    lathe2.rotation.y += (0.1 * engine.getDeltaTime()) / -1000;
  });

  const lathe3 = MeshBuilder.CreateLathe('lathe3', {
    shape,
    radius: 9,
    tessellation: 3,
    sideOrientation: Mesh.DOUBLESIDE,
  });
  lathe3.convertToFlatShadedMesh();
  scene.registerBeforeRender(function () {
    lathe3.rotation.x += (0.1 * engine.getDeltaTime()) / -1000;
    lathe3.rotation.y += (0.1 * engine.getDeltaTime()) / 1000;
  });

  return scene;
}
