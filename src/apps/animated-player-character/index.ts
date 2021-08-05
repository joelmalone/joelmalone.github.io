import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { PointerEventTypes } from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders/glTF';

import CharacterGLB from './apc.glb';

const SPEED = 1.6;
/**
 * Observes player input and transforms it into a character movement state observable.
 *
 * @param {BABYLON.Scene} scene
 * @return {*}
 */
function createInputMap(scene: BABYLON.Scene) {
  const states = {
    forward: false,
    left: false,
    right: false,
  };
  const observables = {
    forward: new BABYLON.Observable<boolean>(),
    left: new BABYLON.Observable<boolean>(),
    right: new BABYLON.Observable<boolean>(),
    all: new BABYLON.Observable<typeof states>(),
  };
  const mapping: { [k: string]: keyof typeof states | undefined } = {
    w: 'forward',
    a: 'left',
    d: 'right',
  };

  scene.actionManager = new BABYLON.ActionManager(scene);
  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnKeyDownTrigger,
      function (evt) {
        const keyboardEvent: KeyboardEvent = evt.sourceEvent;
        const k = mapping[keyboardEvent.key.toLowerCase()];
        if (k && !states[k]) {
          states[k] = true;
          observables[k].notifyObservers(true);
          observables.all.notifyObservers(states);
        }
      },
    ),
  );
  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnKeyUpTrigger,
      function (evt) {
        const keyboardEvent: KeyboardEvent = evt.sourceEvent;
        const k = mapping[keyboardEvent.key.toLowerCase()];
        if (k && states[k]) {
          states[k] = false;
          observables[k].notifyObservers(false);
          observables.all.notifyObservers(states);
        }
      },
    ),
  );

  return {
    ...observables,
    destroy: () => {},
  };
}

export function createScene(
  engine: BABYLON.Engine,
  canvasElement: HTMLCanvasElement,
): BABYLON.Scene {
  engine.enableOfflineSupport = false;
  BABYLON.Animation.AllowMatricesInterpolation = true;
  var scene = new BABYLON.Scene(engine);

  const inputs = createInputMap(scene);

  var light = new BABYLON.HemisphericLight(
    'light1',
    new BABYLON.Vector3(0, 1, 0),
    scene,
  );
  light.intensity = 0.6;
  light.specular = BABYLON.Color3.Black();

  var light2 = new BABYLON.DirectionalLight(
    'dir01',
    new BABYLON.Vector3(3, -3, 1),
    scene,
  );
  light2.position = new BABYLON.Vector3(0, 5, 5);

  var shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.blurKernel = 32;

  const followCamera = new BABYLON.FollowCamera(
    'camera1',
    new BABYLON.Vector3(),
    scene,
  );
  followCamera.radius = 5;
  followCamera.heightOffset = 1.5;
  // followCamera.attachControl(true);

  // Observe character movement and transform it into a movement
  //  vector to be applied later (during rendering)
  const localVelocity = new BABYLON.Vector3();
  inputs.all.add((states) => {
    localVelocity.set(0, 0, 0);
    if (states.forward) {
      localVelocity.addInPlaceFromFloats(0, 0, 1);
    }
    if (states.left) {
      localVelocity.addInPlaceFromFloats(-1, 0, 0);
    }
    if (states.right) {
      localVelocity.addInPlaceFromFloats(1, 0, 0);
    }
  });

  scene.onPointerObservable.add((eventData) => {
    // eventData.event is the event object
    // eventData.type is the PointerEventTypes object, in case you need it
    switch (eventData.type) {
      case PointerEventTypes.POINTERTAP: {
        console.log(eventData);
        if (eventData.event.clientX < canvasElement.clientWidth * 0.2) {
          localVelocity.set(1, 0, 0);
        } else if (eventData.event.clientX < canvasElement.clientWidth * 0.4) {
          localVelocity.set(1, 0, 1);
        } else if (eventData.event.clientX < canvasElement.clientWidth * 0.6) {
          localVelocity.set(0, 0, 1);
        } else if (eventData.event.clientX < canvasElement.clientWidth * 0.8) {
          localVelocity.set(-1, 0, 1);
        } else {
          localVelocity.set(-1, 0, 0);
        }
      }
    }
  });

  // The Snowpack build throws Typescript errors, so I've added !s
  const helper = scene.createDefaultEnvironment({
    enableGroundShadow: true,
  })!;
  helper.setMainColor(BABYLON.Color3.Teal());
  helper.ground!.position.y += 0.01;

  // Import the GLB
  BABYLON.SceneLoader.ImportMesh(
    '',
    CharacterGLB,
    '',
    scene,
    (
      meshes,
      particleSystems,
      skeletons,
      animationGroups,
      transformNodes,
      geometries,
      lights,
    ) => {
      shadowGenerator.addShadowCaster(meshes[0], true);

      // Get the animations and begin playing them, but with 0 weight
      const idleAnimation = animationGroups.find((a) => a.name === 'Idle')!;
      const walkingAnimation = animationGroups.find(
        (a) => a.name === 'Walking',
      )!;
      const leftAnimation = animationGroups.find((a) => a.name === 'Left')!;
      const rightAnimation = animationGroups.find((a) => a.name === 'Right')!;
      [idleAnimation, walkingAnimation, leftAnimation, rightAnimation].forEach(
        (a) => {
          a.setWeightForAllAnimatables(0);
          a.start(true);
        },
      );
      [leftAnimation, rightAnimation].forEach((a) => {
        a.syncAllAnimationsWith(walkingAnimation.animatables[0]);
      });

      // We want to transition smoothly between animations, so keep track of that
      // TODO: I think animationtarget has this built-in, look it up
      const targetWeights = {
        idleAnimation: 1,
        walkingAnimation: 0,
        leftAnimation: 0,
        rightAnimation: 0,
      };
      const currentWeights = {
        idleAnimation: 1,
        walkingAnimation: 0,
        leftAnimation: 0,
        rightAnimation: 0,
      };

      const weightsKeys: (keyof typeof currentWeights)[] = [
        'idleAnimation',
        'walkingAnimation',
        'leftAnimation',
        'rightAnimation',
      ];
      const animationSubscription = scene.onBeforeAnimationsObservable.add(
        () => {
          // Observe the current movement vector and reflect it in the target weights
          // Note: walk never goes to a weight of zero. If we set it to 0, then it
          //  stops animating, which means left and right can no longer sync to it.
          //  So we use a tiny non-zero value instead.
          targetWeights.walkingAnimation = localVelocity.z > 0.1 ? 1 : 0.000001;
          targetWeights.leftAnimation = localVelocity.x < -0.1 ? 1 : 0;
          targetWeights.rightAnimation = localVelocity.x > 0.1 ? 1 : 0;
          targetWeights.idleAnimation =
            targetWeights.walkingAnimation == 0.000001 &&
            targetWeights.leftAnimation == 0 &&
            targetWeights.rightAnimation == 0
              ? 1
              : 0;

          // Transition to the target weights
          for (const k of weightsKeys) {
            if (currentWeights[k] < targetWeights[k]) {
              currentWeights[k] += 0.1;
              if (currentWeights[k] > targetWeights[k]) {
                currentWeights[k] = targetWeights[k];
              }
            } else if (currentWeights[k] > targetWeights[k]) {
              currentWeights[k] -= 0.1;
              if (currentWeights[k] < targetWeights[k]) {
                currentWeights[k] = targetWeights[k];
              }
            }
          }
          // Apply target weights
          idleAnimation.setWeightForAllAnimatables(
            currentWeights['idleAnimation'],
          );
          walkingAnimation.setWeightForAllAnimatables(
            currentWeights['walkingAnimation'],
          );
          leftAnimation.setWeightForAllAnimatables(
            currentWeights['leftAnimation'],
          );
          rightAnimation.setWeightForAllAnimatables(
            currentWeights['rightAnimation'],
          );
        },
      );

      // Move the player
      // const renderObservable = scene.onBeforeRenderObservable.add(() => {
      //   const deltaTime = engine.getDeltaTime();
      //   const delta = localVelocity
      //     .normalize()
      //     .scale((deltaTime * SPEED) / 1000);

      //   meshes[0].position.addInPlace(delta);
      // });

      // Add a dummy mesh at the mesh's midpoint, then use that as the camera target
      const dummy = new BABYLON.Mesh('dummy', scene, meshes[0]);
      dummy.position.addInPlaceFromFloats(0, 1, 0);
      followCamera.lockedTarget = dummy;

      const hax = {
        idleAnimation,
        walkingAnimation,
        leftAnimation,
        rightAnimation,
        meshes,
        particleSystems,
        skeletons,
        animationGroups,
        transformNodes,
        geometries,
        lights,
      };
      console.debug('hax', hax);
      Object.assign(window, { hax });
    },
    function (evt) {},
  );

  return scene;
}
