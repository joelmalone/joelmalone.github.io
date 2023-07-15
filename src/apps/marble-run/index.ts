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

  const dampingAndForceFactor = 500;

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

  function onStart(position: Vector3) {
    // Prevent the camera from spinning around
    scene.activeCamera?.detachControl();

    gravityFactor = physicsBody.getGravityFactor();
    linearDamping = physicsBody.getLinearDamping();
    massProperties = physicsBody.getMassProperties();

    physicsBody.setGravityFactor(0);
    physicsBody.setLinearDamping(dampingAndForceFactor);
    physicsBody.setMassProperties({ mass: 1, inertia: new Vector3(0, 0, 0) });

    // fromSphere.isVisible = true;
    fromSphere.position.copyFrom(position);

    toSphere.position.copyFrom(mesh.getAbsolutePosition());

    localPivot
      .copyFrom(mesh.absolutePosition)
      .subtractInPlace(position)
      .addInPlace(new Vector3(0, 2, 0));

    scene.onBeforePhysicsObservable.add(onBeforePhysics);
  }

  function onDrag(position: Vector3) {
    // toSphere.isVisible = true;
    toSphere.position.copyFrom(position).addInPlace(localPivot);
  }

  function onEnd() {
    scene.onBeforePhysicsObservable.removeCallback(onBeforePhysics);

    const linearVelocity = new Vector3();
    physicsBody.getLinearVelocityToRef(linearVelocity);

    physicsBody.setGravityFactor(gravityFactor);
    physicsBody.setLinearDamping(linearDamping);
    physicsBody.setMassProperties(massProperties!);

    fromSphere.isVisible = false;
    toSphere.isVisible = false;

    // Re-enable camera spinning
    scene.activeCamera?.attachControl();
  }

  // mesh.addBehavior(behaviour);
  const dispose = createCustomDragBehaviour(mesh, onStart, onDrag, onEnd);

  return dispose;
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

    // TODO: this is disabled for now because it throws. We need to also
    // pool the materials anyway, if we're being clean
    // fallenMarbles.forEach(({ dispose }) => dispose());
  }
}

export function createCustomDragBehaviour(
  mesh: AbstractMesh,
  onStart: (position: Vector3) => void,
  onDrag: (position: Vector3) => void,
  onEnd: () => void,
) {
  const scene = mesh.getScene();

  // Get the smallest of the screen's width or height
  const screenSize = Math.min(
    scene.getEngine().getRenderWidth(),
    scene.getEngine().getRenderHeight(),
  );

  // From the screen size, define a box that is 10% of the size
  // of the screen - this is effectively the max drag range of
  // the mouse drag, from the start point, in all 4 directions
  const planeActivationLength = 0.1 * screenSize;

  let startXY: null | Vector2 = null;
  let startPosition: null | Vector3 = null;
  let plane: null | Plane = null;

  const observer = scene.onPointerObservable.add((pointerInfo) => {
    const pickInfo = pointerInfo.pickInfo;
    const pickedPoint = pickInfo!.pickedPoint;

    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        if (pickInfo!.pickedMesh !== mesh) {
          return;
        }

        if (pickedPoint) {
          if (startPosition) {
            startXY = null;
            startPosition = null;
            plane = null;

            onEnd();
          }

          startXY = new Vector2(
            pointerInfo.event.clientX,
            pointerInfo.event.clientY,
          );
          startPosition = pickedPoint;
          plane = null;

          onStart(startPosition);
        }
        break;

      case PointerEventTypes.POINTERMOVE:
        const ray = pickInfo!.ray;
        if (ray && startPosition) {
          if (!plane) {
            const dragXY = new Vector2(
              pointerInfo.event.clientX,
              pointerInfo.event.clientY,
            ).subtract(startXY!);
            if (dragXY.length() < planeActivationLength) {
              return;
            }

            const isVerticalDrag = dragXY.normalize().y < -0.7;

            const normal = isVerticalDrag
              ? new Vector3(-ray.direction.x, 0, -ray.direction.z).normalize()
              : Vector3.UpReadOnly;
            plane = Plane.FromPositionAndNormal(startPosition, normal);
          }

          const t = ray.intersectsPlane(plane);
          if (t !== null) {
            const position = ray.origin.add(ray.direction.scale(t));
            onDrag(position);
          }
        }
        break;

      case PointerEventTypes.POINTERUP:
        if (startPosition) {
          startXY = null;
          startPosition = null;
          plane = null;

          onEnd();
        }
        break;
    }
  });

  return function dispose() {
    scene.onPointerObservable.remove(observer);
  };
}
