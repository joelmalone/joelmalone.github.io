import { StartCanvasApp, runCanvasApp } from './runCanvasApp';
import {
  CreateBabylonScene,
  runBabylonPlaygroundScene,
} from './runBabylonPlaygroundScene';

var disposeCurrentScene: (() => void) | null = null;
activateBabylonApp(document.querySelector('canvas')!, 'welcome');

async function activateCanvasApp(canvas: HTMLCanvasElement, appName: string) {
  if (!canvas) {
    throw new Error();
  }
  if (!appName) {
    throw new Error();
  }

  deactivateCurrentApp();

  const importedApp = await import(`./apps/${appName}/index.ts`);
  const startCanvasApp = importedApp.startCanvasApp as StartCanvasApp;

  disposeCurrentScene = runCanvasApp(canvas, startCanvasApp);
}

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

  const importedApp = await import(`./apps/${babylonAppName}/index.ts`);
  const createScene = importedApp.createScene as CreateBabylonScene;

  disposeCurrentScene = runBabylonPlaygroundScene(canvas, createScene);
}

function deactivateCurrentApp() {
  disposeCurrentScene && disposeCurrentScene();
  disposeCurrentScene = null;
}

document.addEventListener('slide-activated', (ev) => {
  const canvasElement = (ev.target as HTMLElement).querySelector('canvas')!;
  const dataset = (ev as any).detail?.dataset;

  const { canvas, babylon } = dataset;
  if (canvas) {
    activateCanvasApp(canvasElement, canvas);
  } else if (babylon) {
    activateBabylonApp(canvasElement, babylon);
  }
});

document.addEventListener('slide-deactivated', deactivateCurrentApp);
