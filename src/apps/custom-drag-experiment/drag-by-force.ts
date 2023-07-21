import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { Plane } from '@babylonjs/core/Maths/math.plane';
import { Vector2, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Node } from '@babylonjs/core/node';
import { PhysicsBody } from '@babylonjs/core/Physics/v2';
import { Scene } from '@babylonjs/core/scene';
import { startCustomDragBehaviour } from './drag-behaviour';

export type Predicate = (mesh: AbstractMesh) => PhysicsBody | null;

/**
 * Begins physics-based mesh drag behaviour in the scene. Dragged mesh
 * movement is performed using `applyForce()`.
 *
 * @param scene The scene to attach the drag behaviour to.
 * @param getDraggableForPickedMesh A predicate to allow filtering to draggable
 * meshes, and also a proxy to determine the PhysicsBody to move for the picked
 * mesh.
 * @returns
 */
export function startDragPhysicsBodyByForceBehaviour(
  scene: Scene,
  getDraggableForPickedMesh: Predicate,
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

  const dampingAndForceFactor = 500;

  function onStart(mesh: AbstractMesh, dragStartPosition: Vector3) {
    const physicsBody = getDraggableForPickedMesh(mesh);
    if (!physicsBody) {
      return null;
    }

    // Prevent the camera from spinning around
    scene.activeCamera?.detachControl();

    fromSphere.isVisible = false;
    fromSphere.position.copyFrom(dragStartPosition);
    toSphere.position.copyFrom(dragStartPosition);

    const pickPointOffset = dragStartPosition.subtract(
      physicsBody.transformNode.absolutePosition,
    );

    const gravityFactor = physicsBody.getGravityFactor();
    const linearDamping = physicsBody.getLinearDamping();
    // TODO: do we need to snapshot massProperties? Experiment.
    const massProperties = physicsBody.getMassProperties();

    physicsBody.setGravityFactor(0);
    physicsBody.setLinearDamping(dampingAndForceFactor);
    physicsBody.setMassProperties({
      ...massProperties,
      inertia: new Vector3(0, 0, 0),
    });

    /**
     * While a drag is active, use applyForce() to gradually move the body towards the destination.
     */
    const onBeforePhysics = () => {
      const force = toSphere.position
        .subtract(pickPointOffset)
        .subtractInPlace(physicsBody.transformNode.absolutePosition)
        .scaleInPlace(dampingAndForceFactor);

      const centerOfMass = physicsBody.getMassProperties().centerOfMass;
      const worldCentreOfMass = physicsBody.transformNode.absolutePosition;
      centerOfMass && worldCentreOfMass.addInPlace(centerOfMass);

      physicsBody.applyForce(force, worldCentreOfMass);
    };
    scene.onBeforePhysicsObservable.add(onBeforePhysics);

    function onDrag(position: Vector3) {
      toSphere.isVisible = false;
      toSphere.position.copyFrom(position).addInPlace(new Vector3(0, 2, 0));
    }

    const onEnd = () => {
      scene.onBeforePhysicsObservable.removeCallback(onBeforePhysics);

      physicsBody.setGravityFactor(gravityFactor);
      physicsBody.setLinearDamping(linearDamping);
      // TODO: do we need to reset massProperties? Experiment.
      physicsBody.setMassProperties(massProperties);

      fromSphere.isVisible = false;
      toSphere.isVisible = false;

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
