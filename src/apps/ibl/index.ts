import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { CubeTexture } from '@babylonjs/core/Legacy/legacy';
import { ShadowOnlyMaterial } from '@babylonjs/materials';
import CANNON from 'cannon';
window.CANNON = CANNON;

import Env from './environment.env?url';

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
    Math.PI / 4,
    50,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvasElement);

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
  // scene.clearColor = BABYLON.Color3.White().toColor4();

  // var environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(Env, scene, null, false);

  const environmentHelper = scene.createDefaultEnvironment({
    environmentTexture: Env,
    skyboxTexture: Env,
    skyboxSize: 1000,
  });
  environmentHelper.skyboxTexture.level = 20;

  var counter = 0;
  scene.onBeforeRenderObservable.add(() => {
    const deltaTime = engine.getDeltaTime() / 1000;
    counter += deltaTime / 10;
    environmentHelper.skybox.rotation.set(0, -counter, 0);
    (scene.environmentTexture as CubeTexture).setReflectionTextureMatrix(
      BABYLON.Matrix.RotationY(counter),
    );
  });

  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 1000, height: 1000 },
    scene,
  );
  ground.receiveShadows = true;
  ground.material = new ShadowOnlyMaterial('groundMat', scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.1 },
    scene,
  );

  // addNewCubeCharacters(scene, ground, shadowGenerator);
  addNewCubeCharacters(scene, ground, null);

  var touching = false;
  var lastPoint: BABYLON.Vector3 | undefined | null = null;
  scene.onPointerObservable.add((eventData) => {
    switch (eventData.type) {
      case BABYLON.PointerEventTypes.POINTERDOWN:
        touching = true;
        break;
      case BABYLON.PointerEventTypes.POINTERUP:
        touching = false;
        lastPoint = null;
        break;
      case BABYLON.PointerEventTypes.POINTERMOVE:
        if (touching) {
          var pickResult = scene.pick(
            scene.pointerX,
            scene.pointerY,
            (m) => m === ground,
          );
          const thisPoint = pickResult?.pickedPoint;

          if (lastPoint && thisPoint) {
            const delta = thisPoint.subtract(lastPoint);
            scene.meshes.forEach((m) => {
              const dist = m.position.subtract(thisPoint).length();
              if (dist < 3) {
                m.applyImpulse(delta.scale(7), m.absolutePosition);
              }
            });
          }
          lastPoint = thisPoint;
        }
        break;
    }
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

async function addNewCubeCharacters(
  scene: BABYLON.Scene,
  ground: BABYLON.AbstractMesh,
  shadowGenerator?: BABYLON.ShadowGenerator,
) {
  for (var i = 0; i < 100; i++) {
    const mesh = addNewCubeCharacter(scene, ground);
    shadowGenerator?.addShadowCaster(mesh, true);

    await delay(10);
  }
}

function addNewCubeCharacter(
  scene: BABYLON.Scene,
  ground: BABYLON.AbstractMesh,
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
  mesh.receiveShadows = true;

  var material = new BABYLON.PBRMetallicRoughnessMaterial('material', scene);
  material.metallic = 0.5;
  material.roughness = 0.5;
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
