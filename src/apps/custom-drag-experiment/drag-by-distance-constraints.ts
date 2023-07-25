import { Quaternion, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Node } from '@babylonjs/core/node';
import {
  DistanceConstraint,
  PhysicsBody,
  PhysicsMotionType,
} from '@babylonjs/core/Physics/v2';
import { Scene } from '@babylonjs/core/scene';
import { startCustomDragBehaviour } from './drag-behaviour';
import { KeyboardEventTypes } from '@babylonjs/core';

export type Predicate = (mesh: AbstractMesh) => PhysicsBody | null;

/**
 * Begins physics-based mesh drag behaviour in the scene. Dragged mesh
 * movement is performed using several distance constraints.
 *
 * @param scene The scene to attach the drag behaviour to.
 * @param getDraggableForPickedMesh A predicate to allow filtering to draggable
 * meshes, and also a proxy to determine the PhysicsBody to move for the picked
 * mesh.
 * @returns
 */
export function startDragPhysicsBodyByDistanceConstraintsBehaviour(
  scene: Scene,
  getDraggableForPickedMesh: Predicate,
  constraintsDirections: Vector3[],
) {
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
  const toSphereRotation = (toSphere.rotationQuaternion =
    Quaternion.Identity());

  fromSphere.isVisible = false;
  toSphere.isVisible = false;

  function onStart(mesh: AbstractMesh, dragStartPosition: Vector3) {
    const physicsBody = getDraggableForPickedMesh(mesh);
    if (!physicsBody) {
      return null;
    }

    // Prevent the camera from spinning around
    scene.activeCamera?.detachControl();

    const targetPosition = physicsBody.transformNode.absolutePosition.clone();
    const targetRotation =
      physicsBody.transformNode.absoluteRotationQuaternion.clone();
    console.log(
      'physicsBody.transformNode',
      physicsBody.transformNode.name,
      physicsBody.transformNode,
    );

    fromSphere.isVisible = false;
    fromSphere.position.copyFrom(targetPosition);
    toSphere.position.copyFrom(targetPosition);
    toSphereRotation.copyFrom(targetRotation);

    const pickPointOffset = dragStartPosition.subtract(
      physicsBody.transformNode.absolutePosition,
    );

    console.log('Drag started.', {
      targetPosition,
      pickPointOffset,
      targetRotation: targetRotation.toEulerAngles(),
    });

    let hasMoved = false;

    const onBeforePhysics = scene.onBeforePhysicsObservable.add(() => {
      if (hasMoved) {
        const positionDiff = targetPosition.subtract(toSphere.position);
        toSphere.position.addInPlace(
          positionDiff.scale((scene.deltaTime / 1000) * 5),
        );
      }

      const rotation = Quaternion.Slerp(
        toSphereRotation,
        targetRotation,
        (scene.deltaTime / 1000) * 5,
      );
      toSphereRotation.copyFrom(rotation);
    });

    type SpinCommand = 'up' | 'down' | 'left' | 'right' | 'reset';
    const spin = (spinCommand: SpinCommand) => {
      const camera = scene.activeCamera;
      if (!camera) {
        return;
      }

      const turn = (45 * Math.PI) / 180;
      const rotation = new Quaternion();

      switch (spinCommand) {
        case 'reset':
          const cameraForwardFlat = camera.getDirection(new Vector3(0, 0, 1));
          cameraForwardFlat.y = 0;
          cameraForwardFlat.normalize();
          const newRotation = Quaternion.FromLookDirectionLH(
            cameraForwardFlat,
            camera.upVector,
          );
          targetRotation.copyFrom(newRotation);
          return;

        case 'up':
          Quaternion.RotationAxisToRef(
            camera.getDirection(Vector3.LeftReadOnly),
            -turn,
            rotation,
          );
          break;
        case 'down':
          Quaternion.RotationAxisToRef(
            camera.getDirection(Vector3.LeftReadOnly),
            turn,
            rotation,
          );
          break;
        case 'left':
          Quaternion.RotationAxisToRef(camera.upVector, turn, rotation);
          break;
        case 'right':
          Quaternion.RotationAxisToRef(camera.upVector, -turn, rotation);
          break;
      }
      // Order of rotation is important - we want to perform our spin in world
      // space, then apply the existing targetRotation, which results in this
      // awkward expression...
      targetRotation.copyFrom(rotation.multiplyInPlace(targetRotation));
    };

    const keyMappings = {
      reset: [' ', 'x'],
      up: ['w', 'ArrowUp'],
      down: ['s', 'ArrowDown'],
      left: ['a', 'ArrowLeft'],
      right: ['d', 'ArrowRight'],
    };

    const onKeyboard = scene.onKeyboardObservable.add((ev) => {
      if (ev.type === KeyboardEventTypes.KEYUP) {
        const spinCommand = Object.entries(keyMappings)
          .filter(([, keys]) => keys.includes(ev.event.key))
          .map(([spinCommand]) => spinCommand as SpinCommand)[0];

        if (spinCommand) {
          spin(spinCommand);
        }
      }
    });

    const constraints = constraintsDirections
      // TODO: experiment with combinations of scale and joint dist
      // .map((v) => v.scale(1))
      .map((dir) => {
        const sphere = MeshBuilder.CreateSphere(
          'constraint sphere',
          { diameter: 0.5 },
          scene,
        );
        sphere.parent = toSphere;
        sphere.position = dir;
        const sphereBody = new PhysicsBody(
          sphere,
          PhysicsMotionType.ANIMATED,
          false,
          scene,
        );
        sphereBody.disablePreStep = false;

        // TODO: wait for SpringConstraint to be released:
        // https://github.com/BabylonJS/Babylon.js/blob/master/CHANGELOG.md
        const constraint = new DistanceConstraint(0.01, scene);
        constraint.options.pivotA = Vector3.ZeroReadOnly;
        constraint.options.pivotB = dir;

        sphereBody.addConstraint(physicsBody, constraint);

        return {
          constraint,
          sphereBody,
          sphere,
        };
      });

    (window as any).constraints = constraints;

    function onDrag(position: Vector3) {
      hasMoved = true;
      toSphere.isVisible = false;
      targetPosition
        .copyFrom(position)
        .subtractInPlace(pickPointOffset)
        .addInPlace(new Vector3(0, 2, 0));
    }

    const onEnd = () => {
      scene.onKeyboardObservable.remove(onKeyboard);
      scene.onBeforePhysicsObservable.remove(onBeforePhysics);

      fromSphere.isVisible = false;
      toSphere.isVisible = false;
      constraints.forEach(({ sphere, constraint, sphereBody }) => {
        constraint.dispose();
        sphereBody.dispose();
        sphere.dispose();
      });

      // Give the body a whack so it spins - we don't want it to land upright
      physicsBody?.applyImpulse(
        new Vector3(0, 2, 0),
        physicsBody.transformNode.absolutePosition.add(new Vector3(1, 0, 1)),
      );

      // Re-enable camera spinning
      scene.activeCamera?.attachControl();
    };

    return { onDrag, onEnd };
  }

  return startCustomDragBehaviour(scene, onStart);
}

export function getPhysicsBodyIdDraggableIncludingParents(
  pickedMesh: AbstractMesh,
): PhysicsBody | null {
  let node: Node | null = pickedMesh;
  while (node) {
    if (node.metadata?.draggable && 'physicsBody' in node && node.physicsBody) {
      return node.physicsBody as PhysicsBody;
    }
    node = node.parent;
  }

  return null;
}
