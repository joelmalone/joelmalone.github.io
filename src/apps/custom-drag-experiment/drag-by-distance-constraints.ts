import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { Plane } from '@babylonjs/core/Maths/math.plane';
import { Vector2, Vector3 } from '@babylonjs/core/Maths/math.vector';
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
import { TransformNode } from '@babylonjs/core';

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

    fromSphere.isVisible = false;
    fromSphere.position.copyFrom(dragStartPosition);
    toSphere.position.copyFrom(dragStartPosition);

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
        const constraint = new DistanceConstraint(0, scene);

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
      toSphere.isVisible = false;
      toSphere.position.copyFrom(position).addInPlace(new Vector3(0, 2, 0));
    }

    const onEnd = () => {
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
