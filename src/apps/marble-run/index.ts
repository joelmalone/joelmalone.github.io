// http://localhost:5173/standalone.html?app=marble-run&hax

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
  // And also, let's set the scene's "clear colour" to black
  const sceneColor3 = new Color3();
  Color3.HSVtoRGBToRef(30, 0.8, 1, sceneColor3);
  scene.clearColor = sceneColor3.toColor4();

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

  SceneLoader.ImportMeshAsync(null, MarbleRunPieceURL, '', scene).then(
    ({ meshes }) => {
      console.log('Loaded mesh.', meshes);

      const [root, mesh] = meshes;

      function isMesh(mesh: AbstractMesh): mesh is Mesh {
        return mesh.constructor.name === 'Mesh';
      }

      if (!isMesh(mesh)) {
        return;
      }

      root.name = 'marble-piece-root';
      root.position = new Vector3(0, 2, 0);
      // Based on the standard block size being 40x40x20
      root.scaling.setAll(1 / 20);

      shadowGenerator.addShadowCaster(root);

      new PhysicsAggregate(
        mesh,
        PhysicsShapeType.MESH,
        { mass: 1, mesh },
        scene,
      );

      const myMaterial = new StandardMaterial('myMaterial', scene);
      Color3.HSVtoRGBToRef(
        Math.random() * 360,
        0.8,
        0.9,
        myMaterial.diffuseColor,
      );
      mesh.material = myMaterial;

      attachDraggableBehaviour(mesh);
    },
  );

  const marblesContainer = new TransformNode('marblesContainer');
  const interval = setInterval(() => {
    const marble = spawnMarble(
      scene,
      new Vector3(Math.random() * 0.2 - 0.1, 10, Math.random() * 0.2 - 0.1),
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

function spawnMarble(scene: Scene, position: Vector3) {
  const sphere = MeshBuilder.CreateSphere('marble', { diameter: 1 }, scene);
  sphere.position = position;

  // https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
  const myMaterial = new StandardMaterial('myMaterial', scene);
  Color3.HSVtoRGBToRef(Math.random() * 360, 0.8, 0.9, myMaterial.diffuseColor);
  sphere.material = myMaterial;

  new PhysicsAggregate(
    sphere,
    PhysicsShapeType.SPHERE,
    { mass: 1, restitution: 0.25 },
    scene,
  );

  return sphere;
}

function attachDraggableBehaviour(mesh: AbstractMesh) {
  const physicsBody = mesh.physicsBody!;
  if (!physicsBody) {
    throw new Error('physicsBody is required.');
  }

  const scene = mesh.getScene();

  const physicsEngine = scene.getPhysicsEngine()!;
  if (!physicsEngine) {
    throw new Error('physicsEngine is required.');
  }

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

  // https://doc.babylonjs.com/features/featuresDeepDive/behaviors/meshBehaviors#pointerdragbehavior
  var behaviour = new PointerDragBehavior();
  // behaviour.useObjectOrientationForDragging = false;
  // behaviour.updateDragPlane = false;
  // behaviour.dragDeltaRatio = 1;
  behaviour.moveAttached = false;

  const dampingAndForceFactor = 500;

  const adjust = new Vector3();
  const localPivot = new Vector3();
  let gravityFactor = 0;
  let linearDamping = 0;
  let massProperties: null | PhysicsMassProperties = null;

  function onBeforePhysics() {
    const worldCentreOfMass = mesh.absolutePosition.add(
      physicsBody.getMassProperties().centerOfMass!,
    );
    const diff = toSphere.position.subtract(worldCentreOfMass);

    physicsBody.applyForce(
      diff.scale(dampingAndForceFactor),
      worldCentreOfMass,
    );
  }

  behaviour.onDragStartObservable.add((ev, state) => {
    gravityFactor = physicsBody.getGravityFactor();
    linearDamping = physicsBody.getLinearDamping();
    massProperties = physicsBody.getMassProperties();

    physicsBody.setGravityFactor(0);
    physicsBody.setLinearDamping(dampingAndForceFactor);
    physicsBody.setMassProperties({ mass: 1, inertia: new Vector3(0, 0, 0) });

    const point = ev.pointerInfo!.pickInfo!.pickedPoint!;
    adjust.copyFrom(point).subtractInPlace(ev.dragPlanePoint);

    fromSphere.isVisible = true;
    fromSphere.position.copyFrom(point);

    toSphere.position.copyFrom(mesh.getAbsolutePosition());

    localPivot.copyFrom(point).subtractInPlace(mesh.absolutePosition);

    scene.onBeforePhysicsObservable.add(onBeforePhysics);
  });

  behaviour.onDragObservable.add((ev, state) => {
    const point = ev.dragPlanePoint.add(adjust);

    toSphere.isVisible = true;
    toSphere.position.copyFrom(point).subtractInPlace(localPivot);
  });

  behaviour.onDragEndObservable.add((ev, state) => {
    scene.onBeforePhysicsObservable.removeCallback(onBeforePhysics);

    const linearVelocity = new Vector3();
    physicsBody.getLinearVelocityToRef(linearVelocity);

    physicsBody.setGravityFactor(gravityFactor);
    physicsBody.setLinearDamping(linearDamping);
    physicsBody.setMassProperties(massProperties!);

    fromSphere.isVisible = false;
    toSphere.isVisible = false;
  });

  mesh.addBehavior(behaviour);

  return function dispose() {
    behaviour.detach();
  };
}

function killFallenMarbles(container: TransformNode) {
  const fallenMarbles = container.getChildren(
    (n: any) => n.absolutePosition!.y < -100,
  );

  if (fallenMarbles.length) {
    console.debug(
      `Killing ${fallenMarbles.length} fallen marbles.`,
      fallenMarbles,
    );

    fallenMarbles.forEach(({ dispose }) => dispose());
  }
}
