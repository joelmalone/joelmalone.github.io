export interface CanvasApp {
  draw: () => void;
  dispose: () => void;
}

export type StartCanvasApp = (
  context2d: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) => CanvasApp;

export function runCanvasApp(
  canvasElement: HTMLCanvasElement,
  startApp: StartCanvasApp,
) {
  const context = canvasElement.getContext('2d');
  if (!context) {
    throw new Error();
  }
  const app = startApp(context, canvasElement);

  function onWindowResized() {
    // engine.resize();
    canvasElement.width = canvasElement.clientWidth;
    canvasElement.height = canvasElement.clientHeight;
    app.draw()
  }

  // // Watch for browser/canvas resize events
  window.addEventListener('resize', onWindowResized);

  onWindowResized();
  app.draw();

  return () => {
    console.log('Shutting down Canvas-based app.');

    window.removeEventListener('resize', onWindowResized);
    app.dispose();
  };
}
