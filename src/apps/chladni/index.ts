/*

Chladni refs

https://github.com/luciopaiva/chladni
http://paulbourke.net/geometry/chladni/

Canvas refs

https://simon.html5.org/dump/html5-canvas-cheat-sheet.html
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

*/

const Black = [0, 0, 0];
// const White = [0, 0, 0];
// const Greyish = [52, 71, 92];
// const PeachOrSomethingIdk = [253, 125, 95];
// const LightPeach = [255, 230, 227];
// const MidPeach = [254, 164, 142];
const SatchedPeach = [252, 135, 106];
// const LightBleu = [227, 230, 255];
// const MidBleu = [142, 164, 254];

export function startCanvasApp(
  context2d: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) {
  var m = 1;
  var n = 5;

  var frameDurations: number[] = [];

  function draw() {
    // Create an imageDta to fit the entire canvas
    const imageData = context2d.createImageData(
      canvasElement.width,
      canvasElement.height,
    );
    // Getting this is SUPER SLOW (?!), so cache them
    const imageWidth = imageData.width;
    const imageHeight = imageData.height;

    const L = Math.min(400, imageWidth, imageHeight);

    const frameStart = Date.now();

    // Step through each pixel one by one; pixel values are computed independently
    for (var y = 0; y < imageHeight; y++) {
      for (var x = 0; x < imageWidth; x++) {
        // Translate the pattern's origin so it is in the centre of the screen
        const tx = x - imageWidth / 2;
        const ty = y - imageHeight / 2;

        // Calculate the vibrational intensity at this pixel; this is Chladni's formula
        const f =
          Math.cos((n * Math.PI * tx) / L) * Math.cos((m * Math.PI * ty) / L) -
          Math.cos((m * Math.PI * tx) / L) * Math.cos((n * Math.PI * ty) / L);

        // Run the vibrational intensity through a filter.
        // "Continuous" is the most accurate representation, but looks lame.
        // "Zero" gives us the same patterns as drawn by Chladni.

        // Continuous: map from [-2,2] to [0,256]
        // const b = ((f + 2) / 4) * 256;
        // Zero: render black where intensity is 0 (with tolerance)
        const b = Math.abs(f) < 0.1 ?  SatchedPeach:Black;
        // One and negative one ("peaks and troughs")
        // const b = Math.abs(f) > .9 ? 255 : 0;
        // One ("peaks")
        // const b = f > .9 ? 255 : 0;
        // Negative one ("troughs")
        // const b = f < -0.9 ? 255 : 0;

        const index = x * 4 + y * 4 * imageWidth;
        imageData.data[index] = b[0];
        imageData.data[index + 1] = b[1];
        imageData.data[index + 2] = b[2];
        imageData.data[index + 3] = 255;
      }
    }

    // Track render timings and report it every n frames
    const frameDuration = Date.now() - frameStart;
    frameDurations.push(frameDuration);
    if (frameDurations.length > 100) {
      var avg =
        frameDurations.reduce((sum, i) => sum + i, 0) / frameDurations.length;
      frameDurations.splice(0);
      const duration = avg;
      const fps = 1000 / avg;
      console.log({ duration, fps });
    }

    context2d.putImageData(imageData, 0, 0);
  }

  var interval = setInterval(() => {
    m += 0.005;
    // m--;
    // n++;
    // m = Math.random() * 10;
    // n = Math.random() * 10;
    draw();
  }, 50);

  function dispose() {
    clearInterval(interval);
  }

  return {
    draw,
    dispose,
  };
}
