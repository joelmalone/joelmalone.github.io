// http://localhost:5173/standalone.html?app=marble-run&hax

// https://doc.babylonjs.com/features/featuresDeepDive/physics/constraints
// https://doc.babylonjs.com/typedoc/classes/BABYLON.EasingFunction

import {
  Engine,
  DirectionalLight,
  HemisphericLight,
  TransformNode,
  Scene,
  Vector2,
  Vector3,
  MeshBuilder,
  ArcRotateCamera,
  HavokPlugin,
  PhysicsAggregate,
  PhysicsShapeType,
  Mesh,
  Node,
  Color3,
  StandardMaterial,
  ShadowGenerator,
  SixDofDragBehavior,
  PointerDragBehavior,
  AbstractMesh,
  PhysicsMotionType,
  BallAndSocketConstraint,
  PhysicsShape,
  PickingInfo,
  Quaternion,
  ActionManager,
  ExecuteCodeAction,
  SceneLoader,
  PhysicsMassProperties,
  Plane,
  PointerEventTypes,
  AssetContainer,
  Scalar,
  Material,
  Animation,
  AnimationEvent,
  PhysicsBody,
} from '@babylonjs/core/Legacy/legacy';
import HavokPhysics from '@babylonjs/havok';
import '@babylonjs/loaders/glTF';

import WasmURL from '/node_modules/@babylonjs/havok/lib/esm/HavokPhysics.wasm?url';
import MarbleRunPieceURL from './marble-run-piece.glb?url';

export function createScene(engine: Engine): Scene {
  // Create a BabylonJS scene
  const scene = new Scene(engine);

  populateScene(scene);

  return scene;
}

async function populateScene(scene: Scene) {
  const materialsPool = createMaterialsPool(scene);

  scene.clearColor = Color3.FromHSV(30, 0.8, 1).toColor4();

  const camera = new ArcRotateCamera(
    'camera',
    (150 / 180) * Math.PI,
    (45 / 180) * Math.PI,
    23,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl();

  // Create a directional light; this is the main light source and will cast shadows
  const shadowLight = new DirectionalLight(
    'shadowLight',
    // This is the light direction, but also is inverted and used as the light's
    // position when computing the shadow clip frustum; two birds with one stone
    new Vector3(0, -20, 10),
    scene,
  );
  // https://doc.babylonjs.com/features/featuresDeepDive/lights/shadows#directional-lights
  // Turn this off, otherwise falling marbles cause the shadow clip frustum to get really really BEEEG
  shadowLight.autoUpdateExtends = false;
  // Define the clip frustum
  shadowLight.shadowMinZ = 1;
  shadowLight.shadowMaxZ = 30;
  shadowLight.shadowFrustumSize = 20;
  (window as any).shadowLight = shadowLight;

  // https://doc.babylonjs.com/features/featuresDeepDive/lights/shadows
  const shadowGenerator = new ShadowGenerator(1024, shadowLight);
  // Use ContactHardeningShadow (called PCSS for some reason)
  //https://doc.babylonjs.com/features/featuresDeepDive/lights/shadows
  // Values below were obtained by tweaking the shadow generator in the inspector
  shadowGenerator.darkness = 0.95;
  shadowGenerator.useContactHardeningShadow = true;
  shadowGenerator.contactHardeningLightSizeUVRatio = 0.1;
  // PCSS is only supported in WebGL2 and will fall back to PCS (I think?), so
  // uhhhh let's hope  everyone has WebGL2

  // Create an ambient light with low intensity, so the dark parts of the scene aren't pitch black
  var ambientLight = new HemisphericLight(
    'ambient light',
    shadowLight.direction,
    scene,
  );
  ambientLight.intensity = 0.3;

  // Tell HavokPhysics() where the .wasm file is located
  function locateFile(): string {
    return WasmURL;
  }

  const havokInstance = await HavokPhysics({ locateFile });
  const havokPlugin = new HavokPlugin(true, havokInstance);
  scene.enablePhysics(new Vector3(0, -9.8, 0), havokPlugin);

  const ground = createGround(scene);
  ground.receiveShadows = true;

  startDraggableBehaviour(scene);

  // https://doc.babylonjs.com/features/featuresDeepDive/importers/loadingFileTypes#sceneloaderloadassetcontainer
  const container = await SceneLoader.LoadAssetContainerAsync(
    MarbleRunPieceURL,
    '',
    scene,
  );

  console.log('Loaded mesh.', container.meshes[0]);

  const [containerMesh] = container.meshes;

  function isMesh(node: Node): node is Mesh {
    return node.constructor.name === 'Mesh';
  }

  if (!isMesh(containerMesh)) {
    return;
  }

  // Based on the standard block size being 40x40x20
  containerMesh.scaling.setAll(1 / 20);
  containerMesh.bakeCurrentTransformIntoVertices();
  containerMesh.refreshBoundingInfo();

  spawnBlock(new Vector3(0, 2, 0));

  for (let i = 0; i < 10; i++) {
    spawnBlock(
      new Vector3(
        Scalar.RandomRange(-5, 5),
        2 + i * 3,
        Scalar.RandomRange(-5, 5),
      ),
    );

    await new Promise((r) => setTimeout(r, 250));
  }

  function spawnBlock(position: Vector3) {
    const root = container.instantiateModelsToScene().rootNodes[0];
    const mesh = root.getChildMeshes()[0];

    if (!isMesh(root)) {
      throw new Error('Cloned root is not a TransformNode.');
    }
    if (!isMesh(mesh)) {
      throw new Error('Cloned mesh is not a Mesh.');
    }

    root.name = 'marble-piece-root';

    mesh.material = materialsPool.fromHue(Math.random());
    mesh.position = position;

    shadowGenerator.addShadowCaster(root, true);

    new PhysicsAggregate(mesh, PhysicsShapeType.MESH, { mass: 1, mesh }, scene);

    mesh.metadata = { draggable: true };

    return root;
  }

  const marblesContainer = new TransformNode('marblesContainer');
  const interval = setInterval(() => {
    const marble = spawnMarble(
      scene,
      new Vector3(Math.random() * 0.2 - 0.1, 10, Math.random() * 0.2 - 0.1),
      materialsPool.fromHue(Math.random()),
    );
    marble.parent = marblesContainer;
    shadowGenerator.addShadowCaster(marble);

    killFallenMarbles(marblesContainer);
  }, 1000);
  scene.onDisposeObservable.addOnce(() => clearInterval(interval));
}

function createGround(scene: Scene) {
  const mesh = MeshBuilder.CreateBox(
    'ground',
    {
      width: 20,
      depth: 20,
      height: 0.5,
    },
    scene,
  );
  mesh.position = new Vector3(0, -0.25, 0);

  new PhysicsAggregate(
    mesh,
    PhysicsShapeType.BOX,
    { mass: 0, restitution: 0.1 },
    scene,
  );

  return mesh;
}

function spawnMarble(scene: Scene, position: Vector3, material: Material) {
  const sphere = MeshBuilder.CreateSphere('marble', { diameter: 1 }, scene);
  sphere.position = position;
  sphere.material = material;

  new PhysicsAggregate(
    sphere,
    PhysicsShapeType.SPHERE,
    { mass: 1, restitution: 0.25 },
    scene,
  );

  sphere.metadata = { draggable: true };

  return sphere;
}

function startDraggableBehaviour(scene: Scene) {
  const fromSphere = MeshBuilder.CreateSphere(
    'from sphere',
    { diameter: 0.5 },
    scene,
  );
  const toSphere = MeshBuilder.CreateSphere(
    'to sphere',
    { diameter: 0.5 },
    scene,
  );
  fromSphere.isVisible = false;
  toSphere.isVisible = false;

  const dampingAndForceFactor = 500;

  function onStart(mesh: AbstractMesh, position: Vector3) {
    const physicsBody = mesh.metadata?.draggable ? mesh.physicsBody! : null;
    if (!physicsBody) {
      return null;
    }

    // Prevent the camera from spinning around
    scene.activeCamera?.detachControl();

    const gravityFactor = physicsBody.getGravityFactor();
    const linearDamping = physicsBody.getLinearDamping();
    const massProperties = physicsBody.getMassProperties();
    const localPivot = mesh.absolutePosition
      .subtract(position)
      .addInPlace(new Vector3(0, 2, 0));

    physicsBody.setGravityFactor(0);
    physicsBody.setLinearDamping(dampingAndForceFactor);
    physicsBody.setMassProperties({ mass: 1, inertia: new Vector3(0, 0, 0) });

    // fromSphere.isVisible = true;
    fromSphere.position.copyFrom(position);
    toSphere.position.copyFrom(mesh.getAbsolutePosition());

    const observer = scene.onBeforePhysicsObservable.add(
      function onBeforePhysics() {
        const worldCentreOfMass =
          physicsBody.transformNode.absolutePosition.add(
            physicsBody.getMassProperties().centerOfMass!,
          );
        const diff = toSphere.position.subtract(worldCentreOfMass);

        physicsBody.applyForce(
          diff.scale(dampingAndForceFactor),
          worldCentreOfMass,
        );
      },
    );

    function onDrag(position: Vector3) {
      // toSphere.isVisible = true;
      toSphere.position.copyFrom(position).addInPlace(localPivot);
    }

    function onEnd() {
      scene.onBeforePhysicsObservable.remove(observer);

      physicsBody.setGravityFactor(gravityFactor);
      physicsBody.setLinearDamping(linearDamping);
      physicsBody.setMassProperties(massProperties!);

      fromSphere.isVisible = false;
      toSphere.isVisible = false;

      // Re-enable camera spinning
      scene.activeCamera?.attachControl();
    }

    return { onDrag, onEnd };
  }

  return startCustomDragBehaviour(scene, onStart);
}

function killFallenMarbles(container: TransformNode) {
  const fallenMarbles = container.getChildren(
    (n: any) => n.absolutePosition!.y < 0,
  );

  if (fallenMarbles.length) {
    console.debug(
      `Killing ${fallenMarbles.length} fallen marbles.`,
      fallenMarbles,
    );

    fallenMarbles.forEach((marble) => {
      marble.parent = null;
      Animation.CreateAndStartAnimation(
        'fade out',
        marble,
        'visibility',
        1,
        1,
        1,
        0,
        0,
        undefined,
        () => marble.dispose(),
      );
    });
  }
}

export function startCustomDragBehaviour(
  scene: Scene,
  onStart: (
    mesh: AbstractMesh,
    position: Vector3,
  ) => null | { onDrag: (position: Vector3) => void; onEnd: () => void },
) {
  // Get the smallest of the screen's width or height
  const screenSize = Math.min(
    scene.getEngine().getRenderWidth(),
    scene.getEngine().getRenderHeight(),
  );

  // From the screen size, define a box that is 10% of the size
  // of the screen - this is effectively the max drag range of
  // the mouse drag, from the start point, in all 4 directions
  const planeActivationLength = 0.1 * screenSize;

  let currentDrag: {
    startXY: Vector2;
    startPosition: Vector3;
    mesh: AbstractMesh;
    onDrag: (position: Vector3) => void;
    onEnd: () => void;
  } | null = null;
  let plane: null | Plane = null;

  const observer = scene.onPointerObservable.add((pointerInfo) => {
    const pickInfo = pointerInfo.pickInfo;
    const pickedPoint = pickInfo!.pickedPoint;
    const pickedMesh = pickInfo!.pickedMesh;

    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        if (pickedPoint && pickedMesh) {
          if (currentDrag) {
            currentDrag.onEnd();

            currentDrag = null;
            plane = null;
          }

          const state = onStart(pickedMesh, pickedPoint);
          if (!state) {
            return;
          }

          currentDrag = {
            startXY: new Vector2(
              pointerInfo.event.clientX,
              pointerInfo.event.clientY,
            ),
            startPosition: pickedPoint,
            mesh: pickedMesh,
            ...state,
          };
          plane = null;
        }
        break;

      case PointerEventTypes.POINTERMOVE:
        if (!currentDrag) {
          return;
        }

        const ray = pickInfo!.ray;
        if (ray) {
          if (!plane) {
            const dragXY = new Vector2(
              pointerInfo.event.clientX,
              pointerInfo.event.clientY,
            ).subtract(currentDrag.startXY!);
            if (dragXY.length() < planeActivationLength) {
              return;
            }

            const isVerticalDrag = dragXY.normalize().y < -0.7;

            const normal = isVerticalDrag
              ? new Vector3(-ray.direction.x, 0, -ray.direction.z).normalize()
              : Vector3.UpReadOnly;
            plane = Plane.FromPositionAndNormal(
              currentDrag.startPosition,
              normal,
            );
          }

          const t = ray.intersectsPlane(plane);
          if (t !== null) {
            const position = ray.origin.add(ray.direction.scale(t));
            currentDrag.onDrag(position);
          }
        }
        break;

      case PointerEventTypes.POINTERUP:
        if (currentDrag) {
          currentDrag.onEnd();

          currentDrag = null;
          plane = null;
        }
        break;
    }
  });

  return function dispose() {
    scene.onPointerObservable.remove(observer);
  };
}

function createMaterialsPool(scene: Scene) {
  const materialsByColor = new Map<string, StandardMaterial>();

  /**
   * Returns a material with the requested hue. The method will reduce the fidelity of the given hue to allow for reuse.
   * @param hue01 the hue, in range `[0, 1)`.
   * @returns A material with the requested hue.
   */
  function fromHue(hue01: number) {
    // https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
    const color = Color3.FromHSV(Math.trunc(hue01 * 36) * 10, 0.8, 0.9);
    const key = color.toHexString();
    let material = materialsByColor.get(key);
    if (!material) {
      material = new StandardMaterial(`createMaterialsPool ${key}`, scene);
      material.diffuseColor = color;
      materialsByColor.set(key, material);
    }
    return material;
  }

  return { fromHue };
}
