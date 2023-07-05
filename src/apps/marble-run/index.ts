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
} from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders/glTF';

export function createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
  // Create a BabylonJS scene
  const scene = new Scene(engine);
  // And also, let's set the scene's "clear colour" to black
  scene.clearColor = new Color4(0, 0, 0);

  const camera = new ArcRotateCamera(
    'camera',
    -110 / 180 * Math.PI,
    90 / 180 * Math.PI,
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

  const wall = MeshBuilder.CreateBox(
    'wall',
    { width: 10, height: 18, depth: 1 },
    scene,
  );
  // Slight tilt
  wall.rotation.x = (25 / 180) * Math.PI;

  spawnMarble(scene, new Vector3(0, 9, 2));

  return scene;
}

function spawnMarble(scene: Scene, position: Vector3) {
  const sphere = MeshBuilder.CreateSphere('marble', { diameter: 1 }, scene);
  sphere.position = position;

  return sphere;
}
