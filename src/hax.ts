// Side-effects required as per https://doc.babylonjs.com/divingDeeper/developWithBjs/treeShaking
import "@babylonjs/core/Materials/standardMaterial";

// Note: the inspector is pretty heavy - it requires @babylonjs/gui @babylonjs/gui-editor @babylonjs/serializers @babylonjs/materials
import { Inspector } from "@babylonjs/inspector";
import { Scene } from "@babylonjs/core/scene";

declare global {
  interface Window {
    hax?: ReturnType<typeof attachHax>["hax"];
  }
}

export function attachHax(scene: Scene) {
  // Inject some debug commands into the window object
  const hax = {
    debug: () => {
      if (Inspector.IsVisible) {
        Inspector.Hide();
      } else {
        Inspector.Show(scene, {});
      }
    },
    scene,
    get camera() {
      return scene.activeCamera;
    },
    get ships() {
      return scene.getMeshesByTags("ship");
    },
  };

  if (new URLSearchParams(location.search).has("debug")) {
    // Avoid a React error by waiting a bit
    setTimeout(hax.debug, 500);
  }

  function onKeyUp(ev: globalThis.KeyboardEvent) {
    // Press ` to toggle the Babylon inspector
    if (ev.key === "`") {
      hax.debug();
    }

    // Press c to cycle between cameras
    if (ev.key === "c") {
      const index = scene.activeCamera
        ? scene.cameras.indexOf(scene.activeCamera) + 1
        : 0;
      scene.activeCamera = scene.cameras[index % scene.cameras.length];
    }

    if (scene.activeCamera && "lockedTarget" in scene.activeCamera) {
      // Press number keys to lock the camera to a ship in the scene
      const numberKeyIndex = parseInt(ev.key);
      if (numberKeyIndex >= 1 && numberKeyIndex <= hax.ships.length) {
        scene.activeCamera.lockedTarget = hax.ships[numberKeyIndex - 1];
      }
    }
  }
  window.addEventListener("keyup", onKeyUp);

  window.hax = hax;

  function dispose() {
    window.removeEventListener("keyup", onKeyUp);
    delete window.hax;
  }

  return {
    hax,
    dispose,
  };
}
