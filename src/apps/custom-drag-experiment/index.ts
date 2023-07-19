// http://localhost:5173/standalone.html?app=marble-run&hax

// https://doc.babylonjs.com/features/featuresDeepDive/physics/constraints
// https://doc.babylonjs.com/typedoc/classes/EasingFunction

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
  AbstractMesh,
  SceneLoader,
  Plane,
  PointerEventTypes,
  Scalar,
  Material,
  Animation,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsImpostor,
  PhysicsShapeBox,
  PhysicsShapeSphere,
  Quaternion,
  PhysicsShapeContainer,
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

  startDraggableBehaviour(scene, materialsPool);

  createDraggableBlock(scene, materialsPool);
}

function createDraggableBlock(
  scene: Scene,
  materialsPool: ReturnType<typeof createMaterialsPool>,
) {
  const root = new TransformNode('root');
  root.position.y = 5;

  const hue = Math.random();
  const cube = MeshBuilder.CreateBox('cube');
  cube.parent = root;
  cube.material = materialsPool.fromHue(hue);
  const sphere = MeshBuilder.CreateSphere('sphere');
  sphere.parent = root;
  sphere.position.y += 0.5;
  sphere.material = materialsPool.fromHue(hue - 0.05);

  const boxShape = new PhysicsShapeBox(
    new Vector3(0, 0, 0),
    Quaternion.Identity(),
    new Vector3(1, 1, 1),
    scene,
  );
  const sphereShape = new PhysicsShapeSphere(new Vector3(0, 0, 0), 0.5, scene);

  const parentShape = new PhysicsShapeContainer(scene);
  parentShape.addChildFromParent(root, boxShape, cube);
  parentShape.addChildFromParent(root, sphereShape, sphere);

  const body = new PhysicsBody(root, PhysicsMotionType.DYNAMIC, false, scene);
  body.shape = parentShape;

  root.metadata = { draggable: true };

  return root;
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

function startDraggableBehaviour(
  scene: Scene,
  materialsPool: ReturnType<typeof createMaterialsPool>,
) {
  const fromSphere = MeshBuilder.CreateSphere(
    'from sphere',
    { diameter: 0.5 },
    scene,
  );
  fromSphere.material = materialsPool.fromHue(0);
  const toSphere1 = MeshBuilder.CreateSphere(
    'to sphere',
    { diameter: 0.5 },
    scene,
  );
  toSphere1.material = materialsPool.fromHue(0.25);

  fromSphere.isVisible = false;
  toSphere1.isVisible = false;

  const dampingAndForceFactor = 500;

  function getDraggable(pickedMesh: AbstractMesh): PhysicsBody | null {
    let node: Node | null = pickedMesh;
    while (node) {
      if (
        node.metadata?.draggable &&
        'physicsBody' in node &&
        node.physicsBody
      ) {
        return node.physicsBody as PhysicsBody;
      }
      node = node.parent;
    }

    return null;
  }

  function onStart(mesh: AbstractMesh, dragStartPosition: Vector3) {
    const physicsBody = getDraggable(mesh);
    if (!physicsBody) {
      return null;
    }

    // Prevent the camera from spinning around
    scene.activeCamera?.detachControl();

    fromSphere.isVisible = true;
    fromSphere.position.copyFrom(dragStartPosition);
    toSphere1.position.copyFrom(dragStartPosition);

    const pickPointOffset = dragStartPosition.subtract(
      physicsBody.transformNode.absolutePosition,
    );

    const gravityFactor = physicsBody.getGravityFactor();
    const linearDamping = physicsBody.getLinearDamping();
    const massProperties = physicsBody.getMassProperties();

    physicsBody.setGravityFactor(0);
    physicsBody.setLinearDamping(dampingAndForceFactor);
    physicsBody.setMassProperties({ mass: 1, inertia: new Vector3(0, 0, 0) });

    const onBeforePhysics = () => {
      const diff = toSphere1.position
        .subtract(pickPointOffset)
        .subtract(physicsBody.transformNode.absolutePosition);

      const worldCentreOfMass = physicsBody.transformNode.absolutePosition.add(
        physicsBody.getMassProperties().centerOfMass!,
      );

      physicsBody.applyForce(
        diff.scale(dampingAndForceFactor),
        worldCentreOfMass,
      );
    };
    const observer = scene.onBeforePhysicsObservable.add(onBeforePhysics);

    function onDrag(position: Vector3) {
      toSphere1.isVisible = true;
      toSphere1.position.copyFrom(position).addInPlace(new Vector3(0, 2, 0));
    }

    const onEnd = () => {
      scene.onBeforePhysicsObservable.remove(observer);

      physicsBody.setGravityFactor(gravityFactor);
      physicsBody.setLinearDamping(linearDamping);
      physicsBody.setMassProperties(massProperties!);

      fromSphere.isVisible = false;
      toSphere1.isVisible = false;

      // Re-enable camera spinning
      scene.activeCamera?.attachControl();
    };

    return { onDrag, onEnd };
  }

  return startCustomDragBehaviour(scene, onStart);
}

export function startCustomDragBehaviour(
  scene: Scene,
  onStart: (
    mesh: AbstractMesh,
    position: Vector3,
  ) => null | {
    onDrag: (position: Vector3, plane: Plane) => void;
    onEnd: () => void;
  },
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
    onDrag: (position: Vector3, plane: Plane) => void;
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
            currentDrag.onDrag(position, plane);
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
