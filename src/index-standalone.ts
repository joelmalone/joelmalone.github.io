import {
  CreateScene,
  runBabylonPlaygroundScene,
} from './runBabylonPlaygroundScene';

const canvas = document.querySelector('#renderCanvas') as HTMLCanvasElement;
if (!canvas) {
  throw new Error();
}

const babylonAppName = new URL(window.location.toString()).searchParams.get('app');

import(`./apps/${babylonAppName}/index.js`).then((importedApp) => {
  const createScene = importedApp.createScene as CreateScene;

  (window as any).babylonScene = runBabylonPlaygroundScene(
    canvas,
    (engine, canvas) => {
      console.log('Initialise scene with this data.', babylonAppName);
      return createScene(engine, canvas);
    },
  );
});
