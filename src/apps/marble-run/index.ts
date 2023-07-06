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
  Color3,
  StandardMaterial,
  ShadowGenerator,
} from '@babylonjs/core/Legacy/legacy';
import HavokPhysics from '@babylonjs/havok';
import '@babylonjs/loaders/glTF';

import WasmURL from '/node_modules/@babylonjs/havok/lib/esm/HavokPhysics.wasm?url';

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
    (-110 / 180) * Math.PI,
    (90 / 180) * Math.PI,
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

  const color3 = new Color3(0.1, 0.2, 0.3);
  Color3.HSVtoRGBToRef(30 + 180, 0.8, 1, color3);
  const color4 = color3.toColor4();
  const wall = MeshBuilder.CreateBox(
    'wall',
    {
      width: 10,
      height: 18,
      depth: 1,
      faceColors: [color4, color4, color4, color4, color4, color4],
    },
    scene,
  );
  // Slight tilt
  wall.rotation.x = (25 / 180) * Math.PI;
  wall.receiveShadows = true;

  new PhysicsAggregate(wall, PhysicsShapeType.BOX, { mass: 0 }, scene);

  const bars = [
    spawnBar(scene, wall, new Vector3(2, 3, -1.5), 10),
    spawnBar(scene, wall, new Vector3(-2, 0, -1.5), -10),
  ];
  for (const bar of bars) {
    shadowGenerator.addShadowCaster(bar);
  }

  const marblesContainer = new TransformNode('marblesContainer');
  const interval = setInterval(() => {
    const marble = spawnMarble(scene, new Vector3(0, 9, 2));
    marble.parent = marblesContainer;
    shadowGenerator.addShadowCaster(marble);
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

  new PhysicsAggregate(
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
