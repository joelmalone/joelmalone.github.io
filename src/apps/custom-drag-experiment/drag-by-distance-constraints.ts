import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { Plane } from '@babylonjs/core/Maths/math.plane';
import {
  Quaternion,
  Vector2,
  Vector3,
} from '@babylonjs/core/Maths/math.vector';
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
import { Axis, TransformNode } from '@babylonjs/core';

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

  fromSphere.isVisible = false;
  toSphere.isVisible = false;

  function onStart(mesh: AbstractMesh, dragStartPosition: Vector3) {
    const physicsBody = getDraggableForPickedMesh(mesh);
    if (!physicsBody) {
      return null;
    }

    // Prevent the camera from spinning around
    scene.activeCamera?.detachControl();

    const pickPointOffset = dragStartPosition.subtract(
      physicsBody.transformNode.absolutePosition,
    );

    const targetPosition = dragStartPosition.clone();
    // TODO: infer from the dragged mesh's current rotation
    const targetRotation = Quaternion.Identity();
    const toSphereRotation = (toSphere.rotationQuaternion =
      Quaternion.Identity());
    let hasMoved = false;

    fromSphere.isVisible = false;
    fromSphere.position.copyFrom(targetPosition);
    toSphere.position.copyFrom(targetPosition);
    toSphereRotation.copyFrom(targetRotation);

    const onBeforeRender = scene.onBeforeRenderObservable.add(() => {
      if (hasMoved) {
        const positionDiff = targetPosition.subtract(toSphere.position);
        toSphere.position.addInPlace(
          positionDiff.scale((scene.deltaTime / 1000) * 5),
        );

        const rotation = Quaternion.Slerp(
          toSphereRotation,
          targetRotation,
          (scene.deltaTime / 1000) * 5,
        );
        toSphereRotation.copyFrom(rotation);
      }
    });

    let i = 0;
    const interval = setInterval(() => {
      const camera = scene.activeCamera;
      if (!camera) {
        return;
      }

      const turn = (90 * Math.PI) / 180;

      const change = new Quaternion();
      switch (i % 4) {
        case 0:
          Quaternion.RotationAxisToRef(
            camera.getDirection(Axis.X),
            turn,
            change,
          );
          break;
        case 1:
          Quaternion.RotationAxisToRef(
            camera.getDirection(Axis.X),
            -turn,
            change,
          );
          break;
        case 2:
          camera;
          Quaternion.RotationAxisToRef(Vector3.UpReadOnly, -turn, change);
          break;
        case 3:
          Quaternion.RotationAxisToRef(Vector3.UpReadOnly, turn, change);
          break;
      }
      targetRotation.multiplyInPlace(change);

      i++;
    }, 1500);

    const constraints = constraintsDirections
      .map((v) => v.scale(1))
      .map((dir) => {
        const sphere = MeshBuilder.CreateSphere(
          'to sphere',
          { diameter: 0.5 },
          scene,
        );
        sphere.parent = toSphere;
        sphere.position = dir.subtract(pickPointOffset);
        const sphereBody = new PhysicsBody(
          sphere,
          PhysicsMotionType.ANIMATED,
          false,
          scene,
        );
        sphereBody.disablePreStep = false;

        // TODO: wait for SpringConstraint to be released:
        // https://github.com/BabylonJS/Babylon.js/blob/master/CHANGELOG.md
        const constraint = new DistanceConstraint(0.02, scene);
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
      // toSphere.position.copyFrom(position).addInPlace(new Vector3(0, 2, 0));
      targetPosition.copyFrom(position).addInPlace(new Vector3(0, 2, 0));
    }

    const onEnd = () => {
      clearInterval(interval);
      scene.onBeforeRenderObservable.remove(onBeforeRender);

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
