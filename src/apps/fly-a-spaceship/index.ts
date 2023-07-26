import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { Quaternion, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { Color4 } from '@babylonjs/core/Maths/math.color';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { ParticleSystem } from '@babylonjs/core/Particles/particleSystem';
import { IMouseEvent } from '@babylonjs/core/Events/deviceInputEvents';
import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Scalar } from '@babylonjs/core/Maths/math.scalar';

// Import components as per https://doc.babylonjs.com/setup/frameworkPackages/es6Support
import '@babylonjs/loaders/glTF';
import "@babylonjs/core/Helpers/sceneHelpers";

export function createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
  // Create a BabylonJS scene
  const scene = new Scene(engine);
  // And also, let's set the scene's "clear colour" to black
  scene.clearColor = new Color4(0, 0, 0);

  // Create an ambient light with low intensity, so the dark parts of the scene aren't pitch black
  var ambientLight = new HemisphericLight(
    'ambient light',
    new Vector3(0, 0, 0),
    scene,
  );
  ambientLight.intensity = 0.25;

  // Create a light to simulate the sun's light
  const sunLight = new DirectionalLight(
    'sun light',
    new Vector3(1, -1, -1),
    scene,
  );
  sunLight.intensity = 5;

  // Start a render loop - basically, this will instruct BabylonJS to continuously re-render the scene
  engine.runRenderLoop(() => {
    scene.render();
  });

  // Bind to the window's resize DOM event, so that we can update the <canvas> dimensions to match;
  // this is needed because the <canvas> render context doesn't automaticaly update itself
  const onWindowResize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };
  // You can see the problem if you disable this next line, and then resize the window - the scene will become pixelated
  window.addEventListener('resize', onWindowResize);

  // Create a UniversalCamera that we will ue as a "chase cam"
  const camera = new UniversalCamera(
    'UniversalCamera',
    new Vector3(0, 0, 0),
    scene,
  );
  // Because our starfield is 10000 units away, we'll need to tweak
  // the camera so it will render things that far away. Note that this
  // is sometimes a bad idea and can cause "z-fighting," but yolo
  camera.maxZ = 11000;

  // Define some references for the chase cam; these are in-scene objects
  // that will be set later, when the spaceship mesh is loaded
  let chaseCameraPosition: TransformNode | null = null; // The position we want to place the camera
  let chaseCameraLookAt: TransformNode | null = null; // The position we want the camera to look at

  // We will use this to refer to our spaceship mesh in the
  // scene, but we need to wait until it's loaded
  let spaceshipMesh: AbstractMesh | null = null;

  // Load the spaceship mesh asynchronously.
  // Note that we are loading a GLTF, which isn't supported by the core BabylonJS runtime, se we need to add the babylonjs.loaders.js script from CDN in the CodePen settings.
  // The mesh comes from Quaternius' excellent Ultimate Space Kit and I've uploaded it to Dropbox:
  // https://quaternius.com/packs/ultimatespacekit.html
  SceneLoader.ImportMeshAsync(
    null,
    // This link was copied from the Dropbox "Share" panel, but the domain needs to be changed to dl.dropboxusercontent.com to avoid issues with CORS
    'https://dl.dropboxusercontent.com/s/xtxf8eo2t3bb66b/Spaceship_BarbaraTheBee.gltf',
    '',
    scene,
  ).then(({ meshes }) => {
    // We now have our spaceship loaded into the scene!

    // Set spaceshipMesh to the first mesh in the array: this is correct
    // for our spaceship, but really depends on the mesh you loaded
    spaceshipMesh = meshes[0];

    // To allow working with rotationQuaternion, which is
    // null by default, we need to give it a value
    spaceshipMesh.rotationQuaternion = Quaternion.Identity();

    // Attach some "chase camera rig points" to the spaceship
    // mesh. These are invisible in-scene objects that are
    // parented to the spaceship, meaning they will always
    // "follow along" with it
    chaseCameraPosition = new TransformNode('chaseCameraPosition', scene);
    chaseCameraPosition.parent = spaceshipMesh;
    // Position this one behind and up a bit; the XYZ are in local coords
    chaseCameraPosition.position = new Vector3(0, 4, -15);
    chaseCameraLookAt = new TransformNode('chaseCameraLookAt', scene);
    chaseCameraLookAt.parent = spaceshipMesh;
    // Position this one in front and up a bit; the XYZ are in local coords
    chaseCameraLookAt.position = new Vector3(0, 2, 10);
    // Now that chaseCameraPosition and chaseCameraLookAt are set, the
    // chase camera code can will it's thing (see code above)
  });

  // The starfield is a BabylonJS ParticleSystem, with a particle limit of 10000
  const starfield = new ParticleSystem('starfield', 10000, scene);
  // We want to emit the particles on the surface of a sphere 10000 in radius
  starfield.createSphereEmitter(10000, 0);
  // We want to emit all of the particles at once, to immiediately fill the scene
  starfield.manualEmitCount = 100000;
  // We want the stars to live forever
  starfield.minLifeTime = Number.MAX_VALUE;
  starfield.maxLifeTime = Number.MAX_VALUE;
  // We want the stars to vary in size
  starfield.minSize = 0.1 * 1000;
  starfield.maxSize = 0.25 * 1000;
  // We don't want the stars to move
  starfield.minEmitPower = 0;
  starfield.maxEmitPower = 0;
  starfield.gravity = new Vector3(0, 0, 0);
  // Star colours will pick from somewhere between these two colours
  starfield.color1 = new Color4(1, 0.8, 0.8, 1.0);
  starfield.color2 = new Color4(1, 1, 1, 1.0);
  // Load a star texture; the image is tiny, so let's just use a data URL.
  // I used this online service to convert from a star.png image to a data URL:
  // https://jpillora.com/base64-encoder/
  starfield.particleTexture = new Texture(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADNJREFUOE9jZKAQMFKon2HUAAYah8H/////g2KJkZERZ2DjjQWKDSAmjYymA1qnA2JiAQB3SAgRq6BZyAAAAABJRU5ErkJggg==',
    scene,
  );
  // Finally, we need to start emitting particles
  starfield.start();

  // We fly the spaceship by dragging the mouse, with the drag direction
  // translating to the Yaw and Pitch changes to the spaceship, and thrust
  // being applied at 100% whenever the mouse is held down.

  // We use the onPointerObservable event to capture mouse drag info into
  // mouseState. Later on, we read mouseState to compute the changes to the
  // ship.
  let mouseState: null | { down: IMouseEvent; last: IMouseEvent } = null;
  scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        // POINTERDOWN: capture the current mouse position as the `down` property
        // Also capture it as the `last` property (effectively a drag of 0 pixels)
        mouseState = { down: pointerInfo.event, last: pointerInfo.event };
        break;

      case PointerEventTypes.POINTERUP:
        // POINTERUP: drag has finished, so clear the mouse state
        mouseState = null;
        break;

      case PointerEventTypes.POINTERMOVE:
        // POINTERMOVE: while dragging, keep the `down` drag position
        // but continuously update the `last` drag position
        if (mouseState) {
          mouseState.last = pointerInfo.event;
        }
        break;
    }
  });

  // Read the current values of mouseState and use it to compute the
  // steering input for the ship, in terms of thrust, yaw and pitch.
  function getSpaceshipInputFromMouse() {
    // If the mouse isn't being pressed, return null, which means "no input"
    if (!mouseState) {
      return null;
    }

    // Get the smallest of the screen's width or height
    const screenSize = Math.min(
      scene.getEngine().getRenderWidth(),
      scene.getEngine().getRenderHeight(),
    );

    // From the screen size, define a box that is 25% of the size
    // of the screen - this is effectively the max drag range of
    // the mouse drag, from the start point, in all 4 directions
    const dragSize = 0.25 * screenSize;

    // Compute the drag difference from the starting position of the drag
    const dragX = mouseState.last.clientX - mouseState.down.clientX;
    // Note: +X maps to +Yaw, but +Y maps to -Pitch, so invert Y:
    const dragY = mouseState.down.clientY - mouseState.last.clientY;

    // Normalised the values to [-1, 1] and map them like this:
    // * X maps to yaw (turn left/right)
    // * Y maps to pitch (turn up/down)
    const yaw = Scalar.Clamp(dragX / dragSize, -1, 1);
    const pitch = Scalar.Clamp(dragY / dragSize, -1, 1);

    // Finally, return the mouse state in terms of spaceship controls
    return {
      thrust: 1,
      yaw,
      pitch,
    };
  }

  // The following values can be tweaked until they "feel right"

  // Our maximum acceleration (units per second per second)
  const MaxThrust = 10;
  // Our maximum turn speed (radians per second)
  const TurnSpeed = 1;
  // The drag coefficient; roughly, how much velocity we will
  // lose per second. Lower values means less drag and a more
  // realistic "newtonian physics" feel, but may not be great
  // for gameplay.
  const DragCoefficient = 0.25;

  // The ship's current velocity
  const velocity = new Vector3();
  // Use the onBeforeRenderObservable event to get the player input
  // and compute the spaceship's physics, and ultimately move the
  // spaceship
  scene.onBeforeRenderObservable.add(() => {
    // If the ship hasn't been loaded yet, we can't do anything
    if (!spaceshipMesh) {
      return;
    }

    // Compute the "time slice" in seconds; we need to know this so
    // we can apply the correct amount of movement
    const deltaSecs = scene.deltaTime / 1000;

    // Get the input form the mouse; the input is returned in terms
    // of steering a spaceship, i.e.:
    //  * thrust: how much forward thrust to apply
    //  * yaw: how much to turn left or right
    //  * pitch: how much to turn up or down
    // Note that input values are normalised from -1 to 1.
    const input = getSpaceshipInputFromMouse();

    // If we have input, then we can compute the turn
    if (input) {
      // Convert Yaw and Pitch to a rotation in quaternion form
      const turn = Quaternion.RotationYawPitchRoll(
        input.yaw * deltaSecs * TurnSpeed,
        input.pitch * deltaSecs * TurnSpeed,
        0,
      );
      // Apply the rotation to our current rotation
      spaceshipMesh.rotationQuaternion!.multiplyInPlace(turn);
    }

    // If we have input, compute acceleration, otherwise it's zero
    const acceleration = input
      ? spaceshipMesh.forward.scale(input.thrust * MaxThrust * deltaSecs)
      : Vector3.Zero();

    // Now apply the various physics forces to move the spaceship

    // Apply acceleration to velocity
    velocity.addInPlace(acceleration);
    // Apply drag to dampen velocity
    velocity.scaleInPlace(1 - DragCoefficient * deltaSecs);
    // Apply velocity to position
    spaceshipMesh.position.addInPlace(velocity.scale(deltaSecs));
  });

  // Use the onBeforeRenderObservable event to move the
  // camera into position and face the correct way
  scene.onBeforeRenderObservable.add(() => {
    if (chaseCameraPosition) {
      // Smoothly interpolate the camera's current position towards the calculated camera position
      camera.position = Vector3.Lerp(
        camera.position,
        chaseCameraPosition.getAbsolutePosition(),
        (scene.deltaTime / 1000) * 3,
      );
      // Note: you can tweak the 3 above to get a snappier
      // or sloppier camera-follow

      // We always want to align the camera's "up" with the spaceship's
      // "up." this gives us a nice fully-3d space feel
      camera.upVector = chaseCameraPosition.up;
    }

    // Turn the camera to always face the look-at position
    if (chaseCameraLookAt) {
      camera.target = chaseCameraLookAt.getAbsolutePosition();
    }
  });

  return scene;
}
