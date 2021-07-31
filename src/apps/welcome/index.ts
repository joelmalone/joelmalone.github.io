import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export function createScene (engine: BABYLON.Engine, canvasElement: HTMLCanvasElement): BABYLON.Scene{
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      (3 * Math.PI) / 2,
      Math.PI / 4,
      40,
      BABYLON.Vector3.Zero(),
      scene,
    );
    camera.attachControl(canvasElement, true);
  
    const light = new BABYLON.HemisphericLight(
      'hemi',
      new BABYLON.Vector3(0, -1, 0),
      scene,
    );
  
    const mat = new BABYLON.StandardMaterial('mat', scene);
    mat.backFaceCulling = false; //Show all faces
  
    const shape = [
      new BABYLON.Vector3(2, 0, 0),
      new BABYLON.Vector3(4, 0.5, 0),
      new BABYLON.Vector3(4, 1.5, 0),
      new BABYLON.Vector3(2, 2, 0),
      new BABYLON.Vector3(2, 0, 0),
    ];
  
    const lathe = BABYLON.MeshBuilder.CreateLathe('lathe', {
      shape,
      radius: 2,
      tessellation: 5,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    });
    lathe.convertToFlatShadedMesh();
    lathe.material = mat;
  
    return scene;
}
