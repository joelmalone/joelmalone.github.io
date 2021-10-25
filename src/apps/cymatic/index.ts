/*

Chladni refs

https://github.com/luciopaiva/chladni
http://paulbourke.net/geometry/chladni/

Canvas refs

https://simon.html5.org/dump/html5-canvas-cheat-sheet.html
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

*/

export function startCanvasApp(
  context2d: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) {
  const L = 400;
  var m = 1;
  var n = 5;
  var t = 0;

  function draw() {
    const imageData = context2d.createImageData(L, L);

    for (var x = 0; x < L; x++) {
      for (var y = 0; y < L; y++) {
        const f =
          Math.cos((n * Math.PI * x) / L) * Math.cos((m * Math.PI * y) / L) -
          Math.cos((m * Math.PI * x) / L) * Math.cos((n * Math.PI * y) / L);

        // Continuous
        // const b = ((f + 2) / 4) * 256;
        // Zero
        const b = Math.abs(f) < 0.1 ? 0 : 255;
        // One
        // const b = Math.abs(f) > .9 ? 0 : 255;
        // > t
        // const b = Math.abs(f) > t ? 0 : 255;
        // < t with continuous
        // const b = Math.abs(f) < t ? (((f + 2) / 4) * 256) : 255;

        imageData.data[x * 4 + y * 4 * L] = b;
        imageData.data[x * 4 + y * 4 * L + 1] = b;
        imageData.data[x * 4 + y * 4 * L + 2] = b;
        imageData.data[x * 4 + y * 4 * L + 3] = 255;
      }
    }

    context2d.putImageData(imageData, 0, 0);
  }

  function dispose() {}

  setInterval(() => {
    m += 0.005
    // m--;
    // n++;
    // m = Math.random() * 10;
    // n = Math.random() * 10;
    t+=0.003
    draw();
  }, 50);

  return {
    draw,
    dispose,
  };
}
