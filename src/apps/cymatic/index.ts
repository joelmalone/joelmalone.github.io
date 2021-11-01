const Black = [0, 0, 0];
// const White = [0, 0, 0];
// const Greyish = [52, 71, 92];
// const PeachOrSomethingIdk = [253, 125, 95];
// const LightPeach = [255, 230, 227];
// const MidPeach = [254, 164, 142];
const SatchedPeach = [252, 135, 106];
// const LightBleu = [227, 230, 255];
// const MidBleu = [142, 164, 254];

/*

Observations and learnings

The sand is essentially "rolling downhill" on a field created by the gradient.
A perfect continuous-value simulation is fast but looks naff. It doesn't look like sand.
Using discrete sand grains and adding random movement factor really makes it look like sand.
Maybe a mixture of the two? Like in luciopaiva/chladni.
Rendering a grain of sand as a single pixel looks nice but is dependent on DPI and disallows downsizing the scene.
When the ImageData is stretched to fit the Canvas, you can't turn the automatic antialiasing off.
Still haven't decided if using the gradient's direction is best, or just relying on intensity and a random direction.
You get pockets of acculumation (local minima I guess). It looks weird. Need to experiment with the gradient slope affecting movement magnitude.
A pure random movement based on intensity probability takes too long to accumulate the grains.
A random decision between the two movement styles works well. Gradient-style to accumulate the sand, random-jiggling to disperse them. Could refactor this into a single path.
I think the L-factor is important. Perhaps we're not supposed to see the plate beyond this - the sound would be attenuated. I should try to restrict the sim to the L area. It's hard to fit the L area to the screen because it factors in m and n - figure it out?
Maybe refactor queryVibration() so it uses [0,1) as the position in the L-area rather than buffer.
Perhaps we don't even need a buffer for the intensity?
I'm not sure if having a maximum density of sand is useful; still experimenting.
Having a max density seems to create a clear max-vs-not-max border in the accumulated sand. The only thing to soften it is the random jumping.
Due to the top-downwards processing, I think some grains of sand might move faster downwards and ot the right due to the chance of double-processing. might need double buffering?
Moving one grain per cell per frame actually reduces movement for stacked sand. If there's 10 grains, only one will move. As opposed to a independant grain moving every frame. This will cause encourage accumulated sand to get "stuck."

*/

function createPlate(width: number, height: number) {
  var values = new Float32Array(width * height);
  var valuesM = 0;
  var valuesN = 0;

  function compute(m: number, n: number) {
    if (m === valuesM && n === valuesN) {
      return;
    }

    valuesM = m;
    valuesN = n;

    // const L = Math.min(400, width, height);
    const L = Math.min(width, height);

    // Step through each pixel one by one; pixel values are computed independently
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        // Translate the pattern's origin so it is in the centre of the screen
        const tx = x - width / 2;
        const ty = y - height / 2;

        // Calculate the vibrational intensity at this pixel; this is Chladni's formula
        const f =
          Math.cos((n * Math.PI * tx) / L) * Math.cos((m * Math.PI * ty) / L) -
          Math.cos((m * Math.PI * tx) / L) * Math.cos((n * Math.PI * ty) / L);

        values[x + y * width] = f;
      }
    }
  }

  function setSize(newWidth: number, newHeight: number) {
    const w = Math.trunc(newWidth);
    const h = Math.trunc(newHeight);

    if (width !== w || height !== h) {
      width = w;
      height = h;
      values = new Float32Array(width * height);
    }
  }

  function getSample(x01: number, y01: number) {
    if (x01 < 0 || x01 >= 1 || y01 < 0 || y01 >= 1) {
      throw new Error();
    }

    const x = Math.trunc(x01 * width);
    const y = Math.trunc(y01 * height);
    return values[x + y * width];
  }

  return {
    compute,
    getSample,
    setSize,
  };
}

function createSand(width: number, height: number, grainsPerCell: number) {
  const MAX_DENSITY = Number.MAX_SAFE_INTEGER;

  // var values = new Uint8ClampedArray(width * height);
  // values.fill(grainsPerCell);
  // for (var i = 0; i < values.length; i++) {
  //   values[i] = i % 10 === 0 ? 1 : 0;
  // }
  var values: Uint8ClampedArray;
  setSize(width, height);

  function jiggle(queryVibration: (x01: number, y01: number) => number) {
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        // const intensity = queryVibration(x / width, y / height);
        // const chanceOfJump = Math.abs(intensity) / 2;
        // if(Math.random() < chanceOfJump){
        // }

        // // The probability that any single grain of sand will jump
        // const probJump = Math.abs(intensity) / 2;

        // const lossToEachNeighbour = Math.trunc(
        //   (values[x + y * width] * probJump) / 4,
        // );
        // const loss = lossToEachNeighbour * 4;

        // if (loss > 0) {
        //   values[x + y * width] -= loss;

        //   if (x > 0) {
        //     values[x - 1 + y * width] += lossToEachNeighbour;
        //   }
        //   if (y > 0) {
        //     values[x + (y - 1) * width] += lossToEachNeighbour;
        //   }
        //   if (x < width - 1) {
        //     values[x + 1 + y * width] += lossToEachNeighbour;
        //   }
        //   if (y < height - 1) {
        //     values[x + (y + 1) * width] += lossToEachNeighbour;
        //   }
        // }

        if (
          x === 0 ||
          x === width - 1 ||
          y === 0 ||
          y === height - 1 ||
          values[x + y * width] === 0
        ) {
          continue;
        }

        if (Math.random() < 0.25) {
          const gradientX = Math.sign(
            queryVibration((x + 1) / width, y / height) -
              queryVibration((x - 1) / width, y / height),
          );
          const gradientY = Math.sign(
            queryVibration(x / width, (y + 1) / height) -
              queryVibration(x / width, (y - 1) / height),
          );
          const toX =
            x +
            gradientX -
            (Math.random() < 0.5 ? -1 : 1) +
            (Math.random() < 0.5 ? -1 : 1);
          const toY =
            y +
            gradientY -
            (Math.random() < 0.5 ? -1 : 1) +
            (Math.random() < 0.5 ? -1 : 1);

          if (
            toX >= 0 &&
            toX < width &&
            toY >= 0 &&
            toY < height &&
            values[toX + toY * width] < MAX_DENSITY
          ) {
            values[x + y * width]--;
            values[toX + toY * width]++;
          }
        } else {
          const intensity = queryVibration(x / width, y / height);
          const probJump = Math.abs(intensity) / 2;
          if (probJump > Math.random()) {
            continue;
          }
          const toX = x + Math.trunc(Math.random() * 5) - 2;
          const toY = y + Math.trunc(Math.random() * 5) - 2;

          if (
            toX >= 0 &&
            toX < width &&
            toY >= 0 &&
            toY < height &&
            values[toX + toY * width] < MAX_DENSITY
          ) {
            values[x + y * width]--;
            values[toX + toY * width]++;
          }
        }
      }
    }
  }

  function setSize(newWidth: number, newHeight: number) {
    const w = Math.trunc(newWidth);
    const h = Math.trunc(newHeight);

    if (width !== w || height !== h) {
      width = w;
      height = h;

      // TODO: it'd be nice to transfer the existing grains
      values = new Uint8ClampedArray(width * height);
      // values.fill(grainsPerCell);
      // for (var i = 0; i < values.length; i++) {
      //   values[i] = i % 10 === 0 ? 1 : 0;
      // }
      values.fill(1);
    }
  }

  function toCanvas(context2d: CanvasRenderingContext2D) {
    const imageData = context2d.createImageData(width, height);
    const colour = SatchedPeach;
    for (var index = 0; index < width * height; index++) {
      // const density = Math.min(1, values[index] / 255);
      const density = values[index] > 0 ? 1 : 0;

      imageData.data[index * 4] = colour[0] * density;
      imageData.data[index * 4 + 1] = colour[1] * density;
      imageData.data[index * 4 + 2] = colour[2] * density;
      imageData.data[index * 4 + 3] = 255;
    }
    context2d.putImageData(imageData, 0, 0);
  }

  return {
    jiggle,
    toCanvas,
    setSize,
  };
}

function createFrameCounter(
  onStats: (stats: { duration: number; fps: number }) => void,
  sampleCount = 100,
) {
  var frameDurations: number[] = [];

  function measureFrame(frameCallback: () => void) {
    const frameStart = Date.now();

    frameCallback();

    const frameDuration = Date.now() - frameStart;
    frameDurations.push(frameDuration);
    if (frameDurations.length > sampleCount) {
      var avg =
        frameDurations.reduce((sum, i) => sum + i, 0) / frameDurations.length;
      frameDurations.splice(0);
      const duration = avg;
      const fps = 1000 / avg;
      onStats({ duration, fps });
    }
  }

  return {
    measureFrame,
  };
}

export function startCanvasApp(
  context2d: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) {
  var m = 1;
  var n = 5;

  const plate = createPlate(10, 10);
  const sand = createSand(canvasElement.width, canvasElement.height, 50);
  const frameCounter = createFrameCounter(console.log);

  function draw() {
    plate.setSize(canvasElement.width, canvasElement.height);
    plate.compute(m, n);

    sand.setSize(canvasElement.width, canvasElement.height);
    sand.jiggle(plate.getSample);
    sand.toCanvas(context2d);
  }

  var interval = setInterval(() => {
    // m += 0.005;
    // m--;
    // n++;
    // m = Math.random() * 10;
    // n = Math.random() * 10;
    frameCounter.measureFrame(() => {
      draw();
    });
  }, 50);

  setInterval(() => {
    m += 2;
  }, 10000);

  function dispose() {
    clearInterval(interval);
  }

  return {
    draw,
    dispose,
  };
}
