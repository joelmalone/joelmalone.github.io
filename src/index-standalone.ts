import {
  CreateBabylonScene,
  runBabylonPlaygroundScene,
} from './runBabylonPlaygroundScene';
import { runCanvasApp, StartCanvasApp } from './runCanvasApp';

const canvas = document.querySelector('#renderCanvas') as HTMLCanvasElement;
if (!canvas) {
  throw new Error();
}

const appName = new URL(window.location.toString()).searchParams.get('app');

import(`./apps/${appName}/index.ts`).then((importedApp) => {
  const startCanvasApp = importedApp.startCanvasApp as StartCanvasApp;
  const createBabylonScene = importedApp.createScene as CreateBabylonScene;

  if (startCanvasApp) {
    runCanvasApp(canvas, startCanvasApp);
  } else if (createBabylonScene) {
    runBabylonPlaygroundScene(canvas, createBabylonScene);
  }
});
