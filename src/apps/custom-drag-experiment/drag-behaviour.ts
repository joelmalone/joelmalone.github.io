import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { Plane } from '@babylonjs/core/Maths/math.plane';
import { Vector2, Vector3 } from '@babylonjs/core/Maths/math.vector';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Scene } from '@babylonjs/core/scene';

/**
 * The handler for the drag start event, which returns the event handlers for
 * subsequent dragging and drag end events, or returns null to abort the drag.
 */
export type DragFactory = (
  mesh: AbstractMesh,
  position: Vector3,
) => null | DragEvents;

/**
 * Defines handlers for the dragging and drag end events.
 */
export interface DragEvents {
  /**
   * Called for each frame that the user moves the pointer while dragging.
   *
   * @param position The world position of the pointer event.
   * @param plane The plane being dragged against.
   */
  onDrag: (position: Vector3, plane: Plane) => void;

  /**
   * Called when the drag ends (usually when the user releases the pointer).
   */
  onEnd: () => void;
}

/**
 * Interprets pointer events in the scene to present low-level drag events to
 * the caller.
 *
 * @param {Scene} scene - The scene in which the drag behavior should be started.
 * @param {DragFactory} onStart - Called when a drag is starting, allowing the caller to specify handling for further drag events, or return null to indicate the object is not draggable.
 * @returns {Function} A disposal method that can be called to stop monitoring for drag events.
 */
export function startCustomDragBehaviour(scene: Scene, onStart: DragFactory) {
  let currentDrag: {
    readonly startXY: Vector2;
    readonly startPosition: Vector3;
    readonly mesh: AbstractMesh;
    readonly events: DragEvents;
    plane: null | Plane;
  } | null = null;

  /** Ends the current drag and fire the drag end event if necessary. */
  function endDrag() {
    if (currentDrag) {
      currentDrag.events.onEnd();
      currentDrag = null;
    }
  }

  const observer = scene.onPointerObservable.add((pointerInfo) => {
    const pickInfo = pointerInfo.pickInfo;
    const pickedPoint = pickInfo!.pickedPoint;
    const pickedMesh = pickInfo!.pickedMesh;

    switch (pointerInfo.type) {
      case PointerEventTypes.POINTERDOWN:
        if (pickedPoint && pickedMesh) {
          endDrag();

          const events = onStart(pickedMesh, pickedPoint);
          if (!events) {
            return;
          }

          currentDrag = {
            startXY: new Vector2(
              pointerInfo.event.clientX,
              pointerInfo.event.clientY,
            ),
            startPosition: pickedPoint,
            mesh: pickedMesh,
            events,
            plane: null,
          };
        }
        break;

      case PointerEventTypes.POINTERMOVE:
        if (!currentDrag) {
          return;
        }

        const ray = pickInfo!.ray;
        if (ray) {
          if (!currentDrag.plane) {
            // Compute how far in pixels we need to drag before the onDrag()
            // events start. This achieves two goals:
            // 1) Provides a tolerance against pre-drag finger jitter
            // 2) Gives us enough movement to calculate the drag direction, so
            //    we can decide which type of plane to use
            const planeActivationLength =
              Math.min(
                scene.getEngine().getRenderWidth(),
                scene.getEngine().getRenderHeight(),
              ) * 0.1;

            const dragXY = new Vector2(
              pointerInfo.event.clientX,
              pointerInfo.event.clientY,
            ).subtract(currentDrag.startXY!);

            if (dragXY.length() < planeActivationLength) {
              return;
            }

            // IF the user drags screen-upwards, then use a screen-facing,
            // Y-aligned vertical plane; otherwise, use the horizontal XZ plane
            const isVerticalDrag = dragXY.normalize().y < -0.7;
            const normal = isVerticalDrag
              ? new Vector3(-ray.direction.x, 0, -ray.direction.z).normalize()
              : Vector3.UpReadOnly;

            currentDrag.plane = Plane.FromPositionAndNormal(
              currentDrag.startPosition,
              normal,
            );
          }

          const t = ray.intersectsPlane(currentDrag.plane);
          if (t !== null) {
            const position = ray.origin.add(ray.direction.scale(t));
            currentDrag.events.onDrag(position, currentDrag.plane);
          }
        }
        break;

      case PointerEventTypes.POINTERUP:
        endDrag();
        break;
    }
  });

  function dispose() {
    endDrag();

    scene.onPointerObservable.remove(observer);
  }

  scene.onDisposeObservable.addOnce(dispose);

  return dispose;
}
