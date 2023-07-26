import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Scene } from '@babylonjs/core/scene';
import { ShadowOnlyMaterial } from '@babylonjs/materials';
import { Animation } from '@babylonjs/core/Animations/animation';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { CannonJSPlugin } from '@babylonjs/core/Physics/v1/Plugins/cannonJSPlugin';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { PhysicsImpostor } from '@babylonjs/core/Physics/v1/physicsImpostor';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { CascadedShadowGenerator } from '@babylonjs/core/Lights/Shadows/cascadedShadowGenerator';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions';

import CANNON from 'cannon';
window.CANNON = CANNON;

// Import components as per https://doc.babylonjs.com/setup/frameworkPackages/es6Support
import '@babylonjs/core/Physics/physicsEngineComponent';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';
import '@babylonjs/core/Culling/ray';

export function createScene(
  engine: Engine,
  canvasElement: HTMLCanvasElement,
): Scene {
  engine.enableOfflineSupport = false;
  Animation.AllowMatricesInterpolation = true;
  var scene = new Scene(engine);

  const camera = new ArcRotateCamera(
    'Camera',
    Math.PI / 6,
    Math.PI / 4,
    50,
    Vector3.Zero(),
    scene,
  );
  camera.setTarget(Vector3.Zero());

  scene.enablePhysics(null, new CannonJSPlugin());
  scene.clearColor = Color3.White().toColor4();

  const ground = MeshBuilder.CreateGround(
    'ground',
    { width: 1000, height: 1000 },
    scene,
  );
  ground.receiveShadows = true;
  ground.material = new ShadowOnlyMaterial('groundMat', scene);
  ground.physicsImpostor = new PhysicsImpostor(
    ground,
    PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.1 },
    scene,
  );

  // https://forum.babylonjs.com/t/directionallight-position-has-meaning/9490/2
  var directionalLight = new DirectionalLight(
    'directionalLight',
    new Vector3(-1, -1, -1),
    scene,
  );
  directionalLight.position = new Vector3(0, 10, 0);
  directionalLight.radius = 10;
  directionalLight.specular = Color3.Black();

  // https://playground.babylonjs.com/#XDNVAY#0
  var shadowGenerator = new CascadedShadowGenerator(1024, directionalLight);
  // shadowGenerator.debug = true;
  shadowGenerator.setDarkness(0.9);
  shadowGenerator.shadowMaxZ = 100;

  var hemisphericLight = new HemisphericLight(
    'hemisphericLight',
    new Vector3(1, 1, 1),
    scene,
  );
  hemisphericLight.intensity = 0.8;
  hemisphericLight.specular = Color3.Black();

  addNewCubeCharacters(scene, ground, shadowGenerator);

  var touching = false;
  var lastPoint: Vector3 | undefined | null = null;
  scene.onPointerObservable.add((eventData) => {
    switch (eventData.type) {
      case PointerEventTypes.POINTERDOWN:
        touching = true;
        break;
      case PointerEventTypes.POINTERUP:
        touching = false;
        lastPoint = null;
        break;
      case PointerEventTypes.POINTERMOVE:
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
  scene: Scene,
  ground: AbstractMesh,
  shadowGenerator: ShadowGenerator,
) {
  for (var i = 0; i < 100; i++) {
    const cube = addNewCubeCharacter(scene, ground);
    shadowGenerator.addShadowCaster(cube.mesh, true);

    await delay(10);
  }
}

function addNewCubeCharacter(scene: Scene, ground: AbstractMesh) {
  // TODO: this looks ok, but i guessed the numbers, so read this:
  // https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
  const color = new Color3();
  Color3.HSVtoRGBToRef(Math.random() * 360, 0.5, 1, color);

  const mesh = MeshBuilder.CreateBox(
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

  mesh.position.set(Math.random() * 100 - 50, 2, Math.random() * 100 - 50);

  mesh.physicsImpostor = new PhysicsImpostor(
    mesh,
    PhysicsImpostor.BoxImpostor,
    { mass: 1, restitution: 0.5 },
    scene,
  );

  function move(direction: Vector3) {
    mesh.applyImpulse(
      direction.normalize().scale(2),
      mesh.getAbsolutePosition().addInPlaceFromFloats(0, 0.5, 0),
    );
  }

  const directions = [
    Vector3.Forward(),
    Vector3.Backward(),
    Vector3.Left(),
    Vector3.Right(),
  ];
  async function brain() {
    while (true) {
      if (isGrounded) {
        if (Math.random() < 0.25) {
          // Move towards origin
          const d = mesh.position.scale(-1);
          move(d);
        } else {
          // Move in a random direction
          const d = directions[Math.trunc(Math.random() * directions.length)];
          move(d);
        }
      }

      await delay(Math.random() * 50 + 50);
    }
  }

  brain();

  var isGrounded = false;

  mesh.actionManager = new ActionManager(scene);
  mesh.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnIntersectionEnterTrigger,
        parameter: ground,
      },
      () => {
        isGrounded = true;
      },
    ),
  );
  mesh.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnIntersectionExitTrigger,
        parameter: ground,
      },
      () => {
        isGrounded = false;
      },
    ),
  );

  return {
    mesh,
    move,
  };
}

function delay(msec: number) {
  return new Promise((r) => setTimeout(r, msec));
}
