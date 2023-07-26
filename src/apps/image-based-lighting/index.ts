import { Engine } from '@babylonjs/core/Engines/engine';
import { Animation } from '@babylonjs/core/Animations/animation';
import { Scene } from '@babylonjs/core/scene';
import { Matrix, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { CannonJSPlugin } from '@babylonjs/core/Physics/v1/Plugins/cannonJSPlugin';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions';
import { PBRMetallicRoughnessMaterial } from '@babylonjs/core/Materials/PBR/pbrMetallicRoughnessMaterial';
import { PhysicsImpostor } from '@babylonjs/core/Physics/v1/physicsImpostor';

// Import components as per https://doc.babylonjs.com/setup/frameworkPackages/es6Support
import '@babylonjs/core/Physics/physicsEngineComponent'
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import "@babylonjs/core/Helpers/sceneHelpers";

import CANNON from 'cannon';
window.CANNON = CANNON;

// The URLs to the environment texture in Babylon's own .env format
import SunsetEnv from './environment-sunset.env?url';
import NightEnv from './environment-night.env?url';
import RiverEnv from './environment-river.env?url';
import NoonEnv from './environment-noon.env?url';

// You can get more HDR images from PolyHaven:
// https://polyhaven.com/hdris
// You can convert HDR images to .env files using Babylon's online tool:
// https://www.babylonjs.com/tools/ibl/

export function createScene(
  engine: Engine,
  canvasElement: HTMLCanvasElement,
): Scene {
  engine.enableOfflineSupport = false;
  Animation.AllowMatricesInterpolation = true;
  var scene = new Scene(engine);

  const camera = new ArcRotateCamera(
    'Camera',
    (75 * Math.PI) / 180,
    (75 * Math.PI) / 180,
    20,
    new Vector3(0, 2.5, 0),
    scene,
  );
  camera.attachControl(canvasElement);

  // We use Cannon physics to drop the cubes into the scene
  scene.enablePhysics(null, new CannonJSPlugin());

  // For each of our skybox texture URLs, load it as a texture
  //  and create a skybox for it. We'll turn off all but one
  //  skybox later.
  const skyboxes: { skybox: Mesh; texture: CubeTexture }[] = [
    SunsetEnv,
    NightEnv,
    RiverEnv,
    NoonEnv,
  ].map((url, index, arr) => {
    const texture = new CubeTexture(url, scene);
    const skybox = scene.createDefaultSkybox(texture, true, 10000, 0.1)!;

    makeSkyboxRotate(texture, skybox);
    addButtonForSkybox(skybox, index, arr.length, setCurrentSkybox);

    return { skybox, texture };
  });

  /**
   * Sets the current skybox by doing two things: enable that skybox
   * and disable all others, and set the current environment texture
   * for the scene.
   * @param {number} index The index of the skybox in `skyboxes`.
   */
  function setCurrentSkybox(index: number) {
    // Hide all skybox meshes except for the chosen one
    for (var i = 0; i < skyboxes.length; i++) {
      const { skybox } = skyboxes[i];
      skybox.setEnabled(i === index);
    }

    // Set the scene env texture to the chosen one
    const { texture } = skyboxes[index];
    scene.environmentTexture = texture;
  }
  setCurrentSkybox(0);

  addPedestalToScene(scene);

  addCubesToSceneOverTime(scene);

  return scene;
}

/**
 * Uses onBeforeRenderObservable to rotate a skybox and it's reflection texture.
 * @param {CubeTexture} texture The skybox's texture.
 * @param {Mesh} skybox The skybox'es mesh.
 */
function makeSkyboxRotate(texture: CubeTexture, skybox: Mesh) {
  skybox.getScene().onBeforeRenderObservable.add(() => {
    const t = Date.now() / 1000 / 4;

    // Rotate the skybox's mesh, which makes the background image rotate
    skybox.rotation.set(0, t, 0);
    // Rotate the reflection texture (in the opposite direction!),
    // which makes the environment's lighting rotate
    texture.setReflectionTextureMatrix(Matrix.RotationY(-t));
  });
}

/**
 * Adds a button to the scene to represent a skybox, that when clicked,
 * sets that skybox as current.
 * @param {Mesh} skybox The skybox's mesh.
 * @param {number} index The index of this skybox in the array containing all skyboxes.
 * @param {number} length The length of the array containing all skyboxes.
 * @param {(index: number) => void} onClicked Invoked when the button is clicked.
 */
function addButtonForSkybox(
  skybox: Mesh,
  index: number,
  length: number,
  onClicked: (index: number) => void,
) {
  {
    const scene = skybox.getScene();

    const meshButton = MeshBuilder.CreateSphere(
      'cube-button',
      {
        diameter: 0.9,
      },
      skybox.getScene(),
    );
    // Attach it to the camera so it's always on screen, kinda like a UI
    meshButton.parent = scene.cameras[0];
    // Interpolate the position; valus were hand-tweaked to fit mobile
    meshButton.position.set(-1.5 + (3 * index) / (length - 1), 3, 10);
    // Wrap it in the skybox's texture
    meshButton.material = skybox.material;
    // Make it render after everything else, so it's "always on top"
    meshButton.renderingGroupId = 1;

    // Add an action so that when clicked, it changes the skybox
    meshButton.actionManager = new ActionManager(scene);
    meshButton.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () =>
        onClicked(index),
      ),
    );

    // Rotate the spheres; make the current skybox's sphere big
    scene.onBeforeRenderObservable.add(() => {
      const t = Date.now() / 1000 / 4;
      meshButton.rotation.set(0, -t, 0);

      meshButton.scaling.setAll(skybox.isEnabled() ? 1.2 : 1);
    });
  }
}

function addPedestalToScene(scene: Scene) {
  // Create a PBR material for the pedestal
  var pedestalMaterial = new PBRMetallicRoughnessMaterial(
    'pedestalMaterial',
    scene,
  );
  pedestalMaterial.metallic = 0;
  pedestalMaterial.roughness = 0.5;

  // Create meshes for the pedestal's parts and add physics imposters

  const pedestalTop = MeshBuilder.CreateCylinder(
    'cylinder',
    {
      diameter: 15,
      faceColors: [
        new Color3(0.01, 0.01, 0.01).toColor4(),
        new Color3(0.01, 0.01, 0.01).toColor4(),
        new Color3(0.01, 0.01, 0.01).toColor4(),
      ],
    },
    scene,
  );
  pedestalTop.material = pedestalMaterial;
  pedestalTop.physicsImpostor = new PhysicsImpostor(
    pedestalTop,
    PhysicsImpostor.CylinderImpostor,
    { mass: 0, restitution: 0.2 },
    scene,
  );

  const pedestalShaft = MeshBuilder.CreateCylinder(
    'cylinder',
    {
      diameter: 10,
      height: 10,
      faceColors: [
        new Color3(0, 0, 0).toColor4(),
        new Color3(0, 0, 0).toColor4(),
        new Color3(0, 0, 0).toColor4(),
      ],
    },
    scene,
  );
  pedestalShaft.material = pedestalMaterial;
  pedestalShaft.position.set(0, -5, 0);
}

async function addCubesToSceneOverTime(scene: Scene) {
  // Create a PBR material for the cubes
  var cubesMaterial = new PBRMetallicRoughnessMaterial('cubesMaterial', scene);
  cubesMaterial.metallic = 0.1;
  cubesMaterial.roughness = 0.5;

  for (var i = 0; i < 100; i++) {
    addCubeToScene(scene, cubesMaterial);

    await delay(10);
  }
}

function addCubeToScene(scene: Scene, material: PBRMetallicRoughnessMaterial) {
  // TODO: this looks ok, but i guessed the numbers, so read this:
  // https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
  const color = new Color3();
  Color3.HSVtoRGBToRef(Math.random() * 360, 0.5, 1, color);

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

  mesh.material = material;

  mesh.position.set(
    Math.random() * 5 - 2.5,
    25 + Math.random() * 25,
    Math.random() * 5 - 2.5,
  );

  mesh.physicsImpostor = new PhysicsImpostor(
    mesh,
    PhysicsImpostor.BoxImpostor,
    { mass: 1, restitution: 0.5 },
    scene,
  );

  return mesh;
}

function delay(msec: number) {
  return new Promise((r) => setTimeout(r, msec));
}
