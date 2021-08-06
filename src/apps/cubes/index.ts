import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { MeshBuilder, PointerEventTypes } from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders/glTF';
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
  // camera.attachControl(canvasElement, false);
  camera.setTarget(BABYLON.Vector3.Zero());

  scene.onPointerObservable.add((eventData) => {
    // eventData.event is the event object
    // eventData.type is the PointerEventTypes object, in case you need it
    switch (eventData.type) {
      case PointerEventTypes.POINTERTAP: {
        console.log(eventData);

        const p = eventData.pickInfo?.pickedPoint;
        if (p) {
          scene.meshes.forEach((m) => {
            const force = m.position.subtract(p);
            const sqr = force.lengthSquared();
            if (sqr < 10*10) {
              const f = 100 - sqr;
              m.applyImpulse(force.normalize().scale(f/10), p);
            }
          });
        }
      }
    }
  });

  // https://forum.babylonjs.com/t/directionallight-position-has-meaning/9490/2

  // var light = new BABYLON.HemisphericLight(
  //   'light1',
  //   new BABYLON.Vector3(0, 1, 0),
  //   scene,
  // );
  // light.intensity = 0.6;
  // light.specular = BABYLON.Color3.Black();

  var light = new BABYLON.DirectionalLight(
    'dir01',
    new BABYLON.Vector3(-1, -1, -1),
    scene,
  );
  light.position = new BABYLON.Vector3(0, 10, 0);
  light.radius = 10;

  // var light = new BABYLON.PointLight(
  //   'light1',
  //   new BABYLON.Vector3(100, 100, 100),
  //   scene,
  // );
  // light.intensity = 0.7;

  // https://playground.babylonjs.com/#XDNVAY#0
  var shadowGenerator = new BABYLON.CascadedShadowGenerator(1024, light);
  // shadowGenerator.debug = true;
  shadowGenerator.setDarkness(0.5);
  shadowGenerator.shadowMaxZ = 100;

  var ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 1000, height: 1000 },
    scene,
  );
  ground.receiveShadows = true;

  (scene.enablePhysics as any)();

  // scene.debugLayer.show();

  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.1 },
    scene,
  );

  addNewCubeCharacters(scene, shadowGenerator);

  const hax = {};
  console.debug('hax', hax);
  Object.assign(window, { hax });

  return scene;
}

async function addNewCubeCharacters(
  scene: BABYLON.Scene,
  shadowGenerator: BABYLON.ShadowGenerator,
) {
  for (var i = 0; i < 100; i++) {
    const cube = addNewCubeCharacter(scene);
    shadowGenerator.addShadowCaster(cube.mesh, true);

    await delay(10);
  }
}

function addNewCubeCharacter(scene: BABYLON.Scene) {
  // TODO: this looks ok, but i guessed the numbers, so read this:
  // https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
  const color = new BABYLON.Color3();
  BABYLON.Color3.HSVtoRGBToRef(Math.random() * 360, 0.5, 0.9, color);

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
  // mesh.receiveShadows = true;

  mesh.position.set(Math.random() * 100 - 50, 10, Math.random() * 100 - 50);

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

      await delay(Math.random() * 100 + 100);
    }
  }

  brain();

  var isGrounded = false;

  mesh.actionManager = new BABYLON.ActionManager(scene);
  mesh.actionManager!.registerAction(
    new BABYLON.ExecuteCodeAction(
      {
        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
        parameter: scene.getMeshByName('ground'),
      },
      () => {
        isGrounded = true;
      },
    ),
  );
  mesh.actionManager!.registerAction(
    new BABYLON.ExecuteCodeAction(
      {
        trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
        parameter: scene.getMeshByName('ground'),
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
