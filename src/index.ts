import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import {
  CreateScene,
  runBabylonPlaygroundScene,
} from './runBabylonPlaygroundScene';

var babylonScene: ReturnType<typeof runBabylonPlaygroundScene> | null = null;
activateBabylonApp(document.querySelector('canvas')!, 'welcome');

async function activateBabylonApp(
  canvas: HTMLCanvasElement,
  babylonAppName: string,
) {
  if (!canvas) {
    throw new Error();
  }
  if (!babylonAppName) {
    throw new Error();
  }

  deactivateCurrentApp();

  const importedApp = await import(`./apps/${babylonAppName}/index.js`);
  const createScene = importedApp.createScene as CreateScene;

  babylonScene = runBabylonPlaygroundScene(canvas, (engine, canvas) => {
    console.log('Initialise scene with this data.', babylonAppName);
    return createScene(engine, canvas);
  });
}

function deactivateCurrentApp() {
  babylonScene?.dispose();
  babylonScene = null;
}

document.addEventListener('slide-activated', (ev) => {
  const canvas = (ev.target as HTMLElement).querySelector('canvas')!;
  const dataset = (ev as any).detail?.dataset;

  const babylonApp = dataset.babylon;
  if (babylonApp) {
    activateBabylonApp(canvas, babylonApp);
  }
});

document.addEventListener('slide-deactivated', deactivateCurrentApp);
