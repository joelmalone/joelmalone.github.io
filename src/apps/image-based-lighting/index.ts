import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import CANNON from 'cannon';
window.CANNON = CANNON;

import SunsetEnv from './environment-sunset.env?url';
import NightEnv from './environment-night.env?url';
import RiverEnv from './environment-river.env?url';
import NoonEnv from './environment-noon.env?url';

export function createScene(
  engine: BABYLON.Engine,
  canvasElement: HTMLCanvasElement,
): BABYLON.Scene {
  engine.enableOfflineSupport = false;
  BABYLON.Animation.AllowMatricesInterpolation = true;
  var scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    (75 * Math.PI) / 180,
    (75 * Math.PI) / 180,
    20,
    new BABYLON.Vector3(0, 2.5, 0),
    scene,
  );
  camera.attachControl(canvasElement);

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());

  const skyboxes = [SunsetEnv, NightEnv, RiverEnv, NoonEnv].map((url: string) => {
    const texture = new BABYLON.CubeTexture(url, scene);
    const skybox = scene.createDefaultSkybox(texture, true, 10000, 0.1)!;
    return { skybox, texture };
  });

  var pedestalMaterial = new BABYLON.PBRMetallicRoughnessMaterial(
    'pedestalMaterial',
    scene,
  );
  pedestalMaterial.metallic = 0;
  pedestalMaterial.roughness = 0.5;

  var cubesMaterial = new BABYLON.PBRMetallicRoughnessMaterial(
    'cubesMaterial',
    scene,
  );
  cubesMaterial.metallic = 0.1;
  cubesMaterial.roughness = 0.5;

  setSkybox(0);
  function setSkybox(index: number) {
    // Hide all skybox meshes except for the chosen one
    for (var i = 0; i < skyboxes.length; i++) {
      const { skybox } = skyboxes[i];
      skybox.setEnabled(i === index % skyboxes.length);
    }

    // Set the scene env texture to the chosen one
    const { texture } = skyboxes[index % skyboxes.length];
    scene.environmentTexture = texture;
  }

  var rotationCounter = 0;
  scene.onBeforeRenderObservable.add(() => {
    const deltaTime = engine.getDeltaTime() / 1000;
    rotationCounter += deltaTime / 3;

    for (const { skybox, texture } of skyboxes) {
      skybox.rotation.set(0, -rotationCounter, 0);
      texture.setReflectionTextureMatrix(
        BABYLON.Matrix.RotationY(rotationCounter),
      );
    }
  });

  const pedestalTop = BABYLON.MeshBuilder.CreateCylinder(
    'cylinder',
    {
      diameter: 15,
      faceColors: [
        new BABYLON.Color3(0.01, 0.01, 0.01).toColor4(),
        new BABYLON.Color3(0.01, 0.01, 0.01).toColor4(),
        new BABYLON.Color3(0.01, 0.01, 0.01).toColor4(),
      ],
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
      ],
    },
    scene,
  );
  pedestalShaft.material = pedestalMaterial;
  pedestalShaft.position.set(0, -5, 0);

  addNewCubeCharactersWithDelay(scene, cubesMaterial);

  skyboxes.map(({ skybox }, index, { length }) => {
    const cubeButton = BABYLON.MeshBuilder.CreateSphere(
      'cube-button',
      {
        diameter: .9,
      },
      scene,
    );
    cubeButton.parent = camera;
    cubeButton.position.set(-1.5 + (3 * index) / (length - 1), 3, 10);
    cubeButton.material = skybox.material;
    cubeButton.renderingGroupId = 1;

    cubeButton.actionManager = new BABYLON.ActionManager(scene);
    cubeButton.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () =>
        setSkybox(index),
      ),
    );

    var rotationCounter = 0;
    scene.onBeforeRenderObservable.add(() => {
      const speed = skybox.isEnabled() ? 10 : 3;
      const deltaTime = engine.getDeltaTime() / 1000;
      rotationCounter += (deltaTime / 10) * speed;

      cubeButton.rotation.set(0, -rotationCounter, 0);
    });
  });

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
