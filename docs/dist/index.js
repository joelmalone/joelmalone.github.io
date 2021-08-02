import { runBabylonPlaygroundScene } from './runBabylonPlaygroundScene.js';
var babylonScene = null;
activateBabylonApp(document.querySelector('canvas'), 'welcome');

async function activateBabylonApp(canvas, babylonAppName) {
  if (!canvas) {
    throw new Error();
  }

  if (!babylonAppName) {
    throw new Error();
  }

  deactivateCurrentApp();
  const importedApp = await import(`./apps/${babylonAppName}/index.js`);
  const createScene = importedApp.createScene;
  babylonScene = runBabylonPlaygroundScene(canvas, (engine, canvas) => {
    console.log('Initialise scene with this data.', babylonAppName);
    return createScene(engine, canvas);
  });
}

function deactivateCurrentApp() {
  babylonScene?.dispose();
  babylonScene = null;
}

document.addEventListener('slide-activated', ev => {
  const canvas = ev.target.querySelector('canvas');
  const dataset = ev.detail?.dataset;
  const babylonApp = dataset.babylon;

  if (babylonApp) {
    activateBabylonApp(canvas, babylonApp);
  }
});
document.addEventListener('slide-deactivated', deactivateCurrentApp);