import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { ShadowOnlyMaterial } from '@babylonjs/materials';
import CANNON from 'cannon';
window.CANNON = CANNON;

import '@babylonjs/loaders/glTF';

// @ts-ignore
import { Ragdoll } from './ragdoll';

import CharacterGLB from '../animated-player-character/apc.glb';

export function createScene(
  engine: BABYLON.Engine,
  canvasElement: HTMLCanvasElement,
): BABYLON.Scene {
  engine.enableOfflineSupport = false;
  var scene = new BABYLON.Scene(engine);

  scene.enablePhysics(null, new BABYLON.CannonJSPlugin());

  const camera = new BABYLON.ArcRotateCamera(
    'Camera',
    Math.PI / 6,
    Math.PI / 4,
    5,
    BABYLON.Vector3.Zero(),
    scene,
  );
  camera.setTarget(new BABYLON.Vector3(0, 1, 0));
  camera.attachControl(canvasElement, false);

  // https://forum.babylonjs.com/t/directionallight-position-has-meaning/9490/2
  var directionalLight = new BABYLON.DirectionalLight(
    'directionalLight',
    new BABYLON.Vector3(-1, -1, -1),
    scene,
  );
  directionalLight.position = new BABYLON.Vector3(0, 10, 0);
  directionalLight.radius = 10;
  directionalLight.specular = BABYLON.Color3.Black();

  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 1000, height: 1000 },
    scene,
  );
  ground.receiveShadows = true;
  ground.material = new ShadowOnlyMaterial('groundMat', scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.1 },
    scene,
  );

  // https://playground.babylonjs.com/#XDNVAY#0
  var shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight);
  shadowGenerator.setDarkness(0.9);

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

      camera.setTarget(meshes[0]);

      meshes[0].position.addInPlaceFromFloats(0, 2, 0);

      const jointCollisions = false;
      const showBoxes = true;
      const mainPivotSphereSize = 0;
      const disableBoxBoneSync = false;
      const ragdoll = new Ragdoll(
        skeletons[0],
        meshes[0],
        config,
        jointCollisions,
        showBoxes,
        mainPivotSphereSize,
        disableBoxBoneSync,
      );

      // ragdoll.disableBoxBoneSync = true;
      // ragdoll.mass = 0;

      ragdoll.init();

      console.log('Skeleton', skeletons[0])
      skeletons[0].returnToRest()

      console.log('Stopping anims.', animationGroups);
      scene.stopAllAnimations();
      animationGroups.forEach((i) => i.stop());

      let skeletonView = new BABYLON.Debug.SkeletonViewer(
        skeletons[0], //Target Skeleton
        meshes[0], //That skeletons Attached Mesh or a Node with the same globalMatrix
        scene, //The Scene scope
        false, //autoUpdateBoneMatrices?
        meshes[0].renderingGroupId > 0 ? meshes[0].renderingGroupId + 1 : 1, // renderingGroupId
        {}, //Configuration Options
      );

      canvasElement.ownerDocument.addEventListener('keypress', (ev) => {
        console.log(ragdoll, ev.key, ev);
        switch (ev.key) {
          case ' ':
            if (ragdoll.ragdollMode) {
              ragdoll.ragdollOff();
            } else {
              ragdoll.ragdoll();
            }
            break;
        }
      });
      // setTimeout(() => {
      //   console.log('GOING RAGDOLLLLLL');
      //   ragdoll.ragdoll();
      // }, 1500);

      // let animationFunc = () => {
      //   skeletons[0].beginAnimation('YBot_Run', true, 1);
      // };
      // animationFunc();

      // buttonRagdoll.onPointerClickObservable.add(() => {
      //   if (ragdoll.ragdollMode) {
      //     animationFunc();
      //     ragdoll.ragdollOff();
      //   } else {
      //     scene.stopAnimation(ragdoll.skeleton);
      //     ragdoll.ragdoll();
      //   }
      // });

      // buttonShowBoxes.onPointerClickObservable.add(() => {
      //   ragdoll.toggleShowBoxes();
      // });

      engine.hideLoadingUI();
    },
  );

  function debug() {
    scene.debugLayer.show();
  }
  function enableCamera() {
    scene.cameras[0].attachControl(canvasElement, false);
  }
  const hax = { debug, enableCamera };
  console.debug('hax', hax);
  Object.assign(window, { hax });

  return scene;
}

const config = [
  // { bones: ['mixamorig:Hips'], size: 0.2, boxOffset: 0.1 },
  {
    bones: ['mixamorig:Spine1'],
    size: 0.2,
    boxOffset: 0.1,
    min: -10,
    max: 10,
  },
  // Arms.
  {
    bones: ['mixamorig:RightArm'],
    size: 0.1,
    width: 0.2,
    rotationAxis: BABYLON.Axis.Z,
    min: -45,
    max: 45,
    boxOffset: 0.15,
    boneOffsetAxis: BABYLON.Axis.X,
  },
  {
    bones: ['mixamorig:LeftArm'],
    size: 0.1,
    width: 0.2,
    rotationAxis: BABYLON.Axis.Z,
    min: -45,
    max: 45,
    boxOffset: -0.15,
    boneOffsetAxis: BABYLON.Axis.X,
  },
  // Forearms.
  {
    bones: ['mixamorig:RightForeArm'],
    size: 0.1,
    width: 0.2,
    rotationAxis: BABYLON.Axis.Y,
    min: -30,
    max: 30,
    boxOffset: 0.15,
    boneOffsetAxis: BABYLON.Axis.X,
  },
  {
    bones: ['mixamorig:LeftForeArm'],
    size: 0.1,
    width: 0.2,
    rotationAxis: BABYLON.Axis.Y,
    min: -30,
    max: 30,
    boxOffset: -0.15,
    boneOffsetAxis: BABYLON.Axis.X,
  },
  // Thighs, shins and feet.
  {
    bones: ['mixamorig:RightUpLeg', 'mixamorig:LeftUpLeg'],
    size: 0.15,
    height: 0.25,
    rotationAxis: BABYLON.Axis.Z,
    min: -40,
    max: 40,
    boxOffset: -0.15,
  },
  {
    bones: ['mixamorig:RightLeg', 'mixamorig:LeftLeg'],
    size: 0.15,
    height: 0.25,
    min: -10,
    max: 90,
    boxOffset: -0.15,
  },
  {
    bones: ['mixamorig:RightFoot', 'mixamorig:LeftFoot'],
    size: 0.15,
    min: 1,
    max: 1,
  }, // min = 1 & max = 1 will make the boxes stand still - like a lock joint.
  {
    bones: ['mixamorig:Neck'],
    size: 0.2,
    boxOffset: 0.15,
    min: -10,
    max: 10,
  },
];
