import {
  UniversalCamera,
  Engine,
  IMouseEvent,
  PointerEventTypes,
  DirectionalLight,
  HemisphericLight,
  SceneLoader,
  Texture,
  Color4,
  Scalar,
  Quaternion,
  AbstractMesh,
  TransformNode,
  ParticleSystem,
  Scene,
  Vector3,
  MeshBuilder,
  ArcRotateCamera,
  HavokPlugin,
  PhysicsAggregate,
  PhysicsShapeType,
  Mesh,
} from '@babylonjs/core/Legacy/legacy';
import HavokPhysics from '@babylonjs/havok';
import '@babylonjs/loaders/glTF';

import WasmURL from '/node_modules/@babylonjs/havok/lib/esm/HavokPhysics.wasm?url';

export function createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
  // Create a BabylonJS scene
  const scene = new Scene(engine);

  populateScene(scene);

  return scene;
}

async function populateScene(scene: Scene) {
  // And also, let's set the scene's "clear colour" to black
  scene.clearColor = new Color4(0, 0, 0);

  const camera = new ArcRotateCamera(
    'camera',
    (-110 / 180) * Math.PI,
    (90 / 180) * Math.PI,
    23,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl();

  // Create an ambient light with low intensity, so the dark parts of the scene aren't pitch black
  var ambientLight = new HemisphericLight(
    'ambient light',
    new Vector3(0, 1, 0),
    scene,
  );
  ambientLight.intensity = 1;

  // Tell HavokPhysics() where the .wasm file is located
  function locateFile(): string {
    return WasmURL;
  }

  const havokInstance = await HavokPhysics({ locateFile });
  const havokPlugin = new HavokPlugin(true, havokInstance);
  scene.enablePhysics(new Vector3(0, -9.8, 0), havokPlugin);

  const wall = MeshBuilder.CreateBox(
    'wall',
    { width: 10, height: 18, depth: 1 },
    scene,
  );
  // Slight tilt
  wall.rotation.x = (25 / 180) * Math.PI;

  const wallAggregate = new PhysicsAggregate(
    wall,
    PhysicsShapeType.BOX,
    { mass: 0 },
    scene,
  );

  spawnBar(scene, wall, new Vector3(2, 3, -1.5), 10);
  spawnBar(scene, wall, new Vector3(-2, 0, -1.5), -10);

  const interval = setInterval(() => {
    const marble = spawnMarble(scene, new Vector3(0, 9, 2));
  }, 1000);
  scene.onDisposeObservable.addOnce(() => clearInterval(interval));
}

function spawnBar(scene: Scene, wall: Mesh, position: Vector3, angle: number) {
  const bar = MeshBuilder.CreateBox(
    'bar',
    { width: 8, height: 0.25, depth: 0.25 },
    scene,
  );
  bar.parent = wall;
  bar.position = position;
  bar.rotation.z = (angle / 180) * Math.PI;

  const aggregate = new PhysicsAggregate(
    bar,
    PhysicsShapeType.BOX,
    { mass: 0, friction: 0 },
    scene,
  );

  return bar;
}

function spawnMarble(scene: Scene, position: Vector3) {
  const sphere = MeshBuilder.CreateSphere('marble', { diameter: 1 }, scene);
  sphere.position = position;

  const aggregate = new PhysicsAggregate(
    sphere,
    PhysicsShapeType.SPHERE,
    { mass: 1, restitution: 0.25 },
    scene,
  );

  return sphere;
}
