import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { CubeTexture } from '@babylonjs/core/Legacy/legacy';
import CANNON from 'cannon';
window.CANNON = CANNON;

import Env from './environment-sunset.env?url';
// import Env from './environment-night.env?url';

export function createScene(
  engine: BABYLON.Engine,
  canvasElement: HTMLCanvasElement,
): BABYLON.Scene {
  engine.enableOfflineSupport = false;
  BABYLON.Animation.AllowMatricesInterpolation = true;
  var scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI / 6,
    (75 * Math.PI) / 180,
    20,
    new BABYLON.Vector3(0, 2.5, 0),
    scene,
  );
  // camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvasElement);

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());

  var skyboxTexture = new BABYLON.CubeTexture(Env, scene);
  var myskybox = scene.createDefaultSkybox(skyboxTexture, true, 10000, .075);

  var counter = 0;
  scene.onBeforeRenderObservable.add(() => {
    const deltaTime = engine.getDeltaTime() / 1000;
    counter += deltaTime / 3;
    myskybox!.rotation.set(0, -counter, 0);
    (scene.environmentTexture as CubeTexture).setReflectionTextureMatrix(
      BABYLON.Matrix.RotationY(counter),
    );
  });

  var pedestalMaterial = new BABYLON.PBRMetallicRoughnessMaterial(
    'pedestalMaterial',
    scene,
  );
  pedestalMaterial.metallic = 0.1;
  pedestalMaterial.roughness = 0.1;

  const pedestalTop = BABYLON.MeshBuilder.CreateCylinder(
    'cylinder',
    {
      diameter: 15,
      faceColors: [ 
        new BABYLON.Color3(.01, .01, .01).toColor4(),
        new BABYLON.Color3(.01, .01, .01).toColor4(),
        new BABYLON.Color3(.01, .01, .01).toColor4(),
      ]
    },
    scene,
  );
  pedestalTop.material = pedestalMaterial;
  pedestalTop.physicsImpostor = new BABYLON.PhysicsImpostor(
    pedestalTop,
    BABYLON.PhysicsImpostor.CylinderImpostor,
    { mass: 0, restitution: 0.2 },
    scene,
  );

  const pedestalShaft = BABYLON.MeshBuilder.CreateCylinder(
    'cylinder',
    {
      diameter: 10,
      height: 10,
      faceColors: [ 
        new BABYLON.Color3(0, 0, 0).toColor4(),
        new BABYLON.Color3(0, 0, 0).toColor4(),
        new BABYLON.Color3(0, 0, 0).toColor4(),
      ]
  },
    scene,
  );
  pedestalShaft.material = pedestalMaterial;
  pedestalShaft.position.set(0, -5, 0);

  var cubesMaterial = new BABYLON.PBRMetallicRoughnessMaterial(
    'cubesMaterial',
    scene,
  );
  cubesMaterial.metallic = 0;
  cubesMaterial.roughness = 0;

  addNewCubeCharactersWithDelay(scene, cubesMaterial);

  function debug() {
    scene.debugLayer.show();
  }
  function enableCamera() {
    camera.attachControl(canvasElement, false);
  }
  const hax = { debug, enableCamera };
  console.debug('hax', hax);
  Object.assign(window, { hax });

  return scene;
}

async function addNewCubeCharactersWithDelay(
  scene: BABYLON.Scene,
  material: BABYLON.PBRMetallicRoughnessMaterial,
) {
  for (var i = 0; i < 100; i++) {
    addNewCubeCharacter(scene, material);

    await delay(10);
  }
}

function addNewCubeCharacter(
  scene: BABYLON.Scene,
  material: BABYLON.PBRMetallicRoughnessMaterial,
) {
  // TODO: this looks ok, but i guessed the numbers, so read this:
  // https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
  const color = new BABYLON.Color3();
  BABYLON.Color3.HSVtoRGBToRef(Math.random() * 360, 0.5, 1, color);

  const mesh = BABYLON.MeshBuilder.CreateBox(
    'cube',
    {
      size: 1,
      faceColors: [
        color.toColor4(),
        color.toColor4(),
        color.toColor4(),
        color.toColor4(),
        color.toColor4(),
        color.toColor4(),
      ],
    },
    scene,
  );

  mesh.material = material;

  mesh.position.set(
    Math.random() * 5 - 2.5,
    25 + Math.random() * 25,
    Math.random() * 5 - 2.5,
  );

  mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
    mesh,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 1, restitution: 0.5 },
    scene,
  );

  return mesh;
}

function delay(msec: number) {
  return new Promise((r) => setTimeout(r, msec));
}
