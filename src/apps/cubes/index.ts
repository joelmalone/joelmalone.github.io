import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { ShadowOnlyMaterial } from '@babylonjs/materials';
import CANNON from 'cannon';
window.CANNON = CANNON;

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

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
  scene.clearColor = BABYLON.Color3.White().toColor4();

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

  // https://forum.babylonjs.com/t/directionallight-position-has-meaning/9490/2
  var directionalLight = new BABYLON.DirectionalLight(
    'directionalLight',
    new BABYLON.Vector3(-1, -1, -1),
    scene,
  );
  directionalLight.position = new BABYLON.Vector3(0, 10, 0);
  directionalLight.radius = 10;
  directionalLight.specular = BABYLON.Color3.Black();

  // https://playground.babylonjs.com/#XDNVAY#0
  var shadowGenerator = new BABYLON.CascadedShadowGenerator(
    1024,
    directionalLight,
  );
  // shadowGenerator.debug = true;
  shadowGenerator.setDarkness(0.9);
  shadowGenerator.shadowMaxZ = 100;

  var hemisphericLight = new BABYLON.HemisphericLight(
    'hemisphericLight',
    new BABYLON.Vector3(1, 1, 1),
    scene,
  );
  hemisphericLight.intensity = 0.8;
  hemisphericLight.specular = BABYLON.Color3.Black();

  addNewCubeCharacters(scene, ground, shadowGenerator);

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
            const mag = delta.length();
            console.log(mag);

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
  shadowGenerator: BABYLON.ShadowGenerator,
) {
  for (var i = 0; i < 100; i++) {
    const cube = addNewCubeCharacter(scene, ground);
    shadowGenerator.addShadowCaster(cube.mesh, true);

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

  mesh.position.set(Math.random() * 100 - 50, 2, Math.random() * 100 - 50);

  mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
    mesh,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 1, restitution: 0.5 },
    scene,
  );

  function move(direction: BABYLON.Vector3) {
    mesh.applyImpulse(
      direction.normalize().scale(2),
      mesh.getAbsolutePosition().addInPlaceFromFloats(0, 0.5, 0),
    );
  }

  const directions = [
    BABYLON.Vector3.Forward(),
    BABYLON.Vector3.Backward(),
    BABYLON.Vector3.Left(),
    BABYLON.Vector3.Right(),
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

  mesh.actionManager = new BABYLON.ActionManager(scene);
  mesh.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      {
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter: ground,
      },
      () => {
        isGrounded = true;
      },
    ),
  );
  mesh.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      {
        trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
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
