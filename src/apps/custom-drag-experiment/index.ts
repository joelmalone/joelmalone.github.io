// http://localhost:5173/standalone.html?app=custom-drag-experiment&hax

// https://doc.babylonjs.com/features/featuresDeepDive/physics/constraints
// https://doc.babylonjs.com/typedoc/classes/EasingFunction

import {
  Engine,
  DirectionalLight,
  HemisphericLight,
  TransformNode,
  Scene,
  Vector3,
  MeshBuilder,
  ArcRotateCamera,
  HavokPlugin,
  PhysicsAggregate,
  PhysicsShapeType,
  Color3,
  StandardMaterial,
  ShadowGenerator,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsShapeBox,
  PhysicsShapeSphere,
  Quaternion,
  PhysicsShapeContainer,
} from '@babylonjs/core/Legacy/legacy';
import HavokPhysics from '@babylonjs/havok';
import '@babylonjs/loaders/glTF';
import {
  getPhysicsBodyIdDraggableIncludingParents,
  startDragPhysicsBodyByForceBehaviour,
} from './drag-by-force';
import { startDragPhysicsBodyByDistanceConstraintsBehaviour } from './drag-by-distance-constraints';
import {
  Button3D,
  GUI3DManager,
  StackPanel3D,
  TextBlock,
  Vector3WithInfo,
} from '@babylonjs/gui';

import WasmURL from '/node_modules/@babylonjs/havok/lib/esm/HavokPhysics.wasm?url';

export function createScene(engine: Engine): Scene {
  // Create a BabylonJS scene
  const scene = new Scene(engine);

  populateScene(scene).then((dispose) =>
    scene.onDisposeObservable.addOnce(dispose),
  );

  return scene;
}

async function populateScene(scene: Scene) {
  const materialsPool = createMaterialsPool(scene);

  scene.clearColor = Color3.FromHSV(30, 0.8, 1).toColor4();

  const camera = new ArcRotateCamera(
    'camera',
    (280 / 180) * Math.PI,
    (60 / 180) * Math.PI,
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

  const dragStyles = {
    ApplyForce: () =>
      startDragPhysicsBodyByForceBehaviour(
        scene,
        getPhysicsBodyIdDraggableIncludingParents,
      ),
    SingleHanging: () =>
      startDragPhysicsBodyByDistanceConstraintsBehaviour(
        scene,
        getPhysicsBodyIdDraggableIncludingParents,
        [new Vector3(0, 2, 0)],
      ),
    SingleCenter: () =>
      startDragPhysicsBodyByDistanceConstraintsBehaviour(
        scene,
        getPhysicsBodyIdDraggableIncludingParents,
        [new Vector3(0, 0, 0)],
      ),
    CenterAndHanging: () =>
      startDragPhysicsBodyByDistanceConstraintsBehaviour(
        scene,
        getPhysicsBodyIdDraggableIncludingParents,
        [new Vector3(0, 2, 0), new Vector3(0, 0, 0)],
      ),
    Crucifixion: () =>
      startDragPhysicsBodyByDistanceConstraintsBehaviour(
        scene,
        getPhysicsBodyIdDraggableIncludingParents,
        [new Vector3(1, 1, 0), new Vector3(-1, 1, 0), new Vector3(0, -1, 0)],
      ),
    Corners: () =>
      startDragPhysicsBodyByDistanceConstraintsBehaviour(
        scene,
        getPhysicsBodyIdDraggableIncludingParents,
        [
          new Vector3(1, 0, 1),
          new Vector3(-1, 0, 1),
          new Vector3(1, 0, -1),
          new Vector3(-1, 0, -1),
        ],
      ),
    HorizontalTriangle: () =>
      startDragPhysicsBodyByDistanceConstraintsBehaviour(
        scene,
        getPhysicsBodyIdDraggableIncludingParents,
        [new Vector3(0, 0, 1), new Vector3(1, 0, -1), new Vector3(-1, 0, -1)],
      ),
    TwoPointSkewer: () =>
      startDragPhysicsBodyByDistanceConstraintsBehaviour(
        scene,
        getPhysicsBodyIdDraggableIncludingParents,
        [new Vector3(0, 0, 1), new Vector3(0, 0, -1)],
      ),
  };

  let currentDragBehaviour: null | (() => void) = null;

  var anchor = new TransformNode('gui anchor');
  anchor.position = new Vector3(-3, 5, 0);

  var manager = new GUI3DManager(scene);
  var stackPanel = new StackPanel3D(true);
  stackPanel.margin = 0.2;
  stackPanel.position.y += 5;

  manager.addControl(stackPanel);

  stackPanel.blockLayout = true;
  const buttons = Object.entries(dragStyles)
    .reverse()
    .map(([name, style]) => {
      const button = new Button3D(`3d button: ${name}`, {
        width: 3,
        height: 0.8,
      });

      const text = new TextBlock();
      text.text = name;
      text.color = 'white';
      text.fontSize = 30;
      button.content = text;

      button.onPointerClickObservable.add(() => {
        currentDragBehaviour && currentDragBehaviour();
        currentDragBehaviour = style();

        buttons.forEach((b) => {
          b.scaling.setAll(b === button ? 1.1 : 1);
          b.content.color = b === button ? 'yellow' : 'white';
        });
      });

      stackPanel.addControl(button);

      return button;
    });

  stackPanel.blockLayout = false;

  stackPanel.linkToTransformNode(anchor);

  // Select the first drag style
  buttons[buttons.length - 1].onPointerClickObservable.notifyObservers(
    new Vector3WithInfo(Vector3.ZeroReadOnly),
  );

  // Spawn some blocks
  for (let i = 0; i < 10; i++) {
    createDraggableBlock(
      scene,
      new Vector3(Math.random() * 10 - 5, 5, Math.random() * 10 - 5),
      materialsPool,
    )
      .getChildMeshes(false)
      .forEach((m) => shadowGenerator.addShadowCaster(m, false));

    await new Promise((r) => setTimeout(r, 500));
  }

  return () => currentDragBehaviour && currentDragBehaviour();
}

function createDraggableBlock(
  scene: Scene,
  position: Vector3,
  materialsPool: ReturnType<typeof createMaterialsPool>,
) {
  const root = new TransformNode('root');
  root.position = position;

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

  body.setMassProperties({ mass: 1 });

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
