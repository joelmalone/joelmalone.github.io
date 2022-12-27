
export function startCanvasApp(
  canvas2d: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) {
  let disposed = false;

  if (!navigator.mediaDevices?.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
  } else {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const audioDevices = devices
          .filter(device => device.kind === 'audioinput')
          .map(({ label }) => label)
        console.log('enumerateDevices() returned the following audio input devices.', audioDevices)
      })
  }

  navigator.mediaDevices.getUserMedia({
    audio: true
  })
    .then(stream => {
      console.log('getUserMedia() returned.', stream)

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      mediaStreamSource.connect(analyser);
      // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
      analyser.fftSize = 32768;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      /*      
      These ranges are spread out in the spectrum [0,Nyquist frequency]. The 
      Nyquist frequency is one-half of the sample rate. So if your
      AudioContext.sampleRate is 48000 (Hertz), your frequency bins will range
      across [0,24000] (also in Hz).

      https://stackoverflow.com/a/44504975/246901
      */
      const nyquist = audioContext.sampleRate / 2;

      console.log('Audio initialised.',
        {
          fftSize: analyser.fftSize,
          frequencyBinCount: analyser.frequencyBinCount,
          sampleRate: audioContext.sampleRate,
        })

      drawVisualizer();

      function drawVisualizer() {
        if (disposed) {
          return;
        }

        requestAnimationFrame(drawVisualizer);

        // TODO: look at the docs: can this fail, e.g. if the user alt-tabs?
        // const canvasContext = canvasElement.getContext('2d');
        // if (!canvasContext) {
        //   return;
        // }

        analyser.getByteFrequencyData(dataArray);

        const width = canvasElement.width;
        const height = canvasElement.height;
        const barWidth = canvasElement.width / dataArray.length;

        // console.log('Drawing frame.', { width, height, dataArray })

        canvas2d.clearRect(0, 0, width, height);
        dataArray.forEach((item, index, array) => {
          const y = item / 255 * height * 1.1;
          canvas2d.strokeStyle = `blue`;
          canvas2d.beginPath();
          canvas2d.lineCap = "round";
          canvas2d.lineWidth = 2;
          canvas2d.moveTo(barWidth * index, height);
          canvas2d.lineTo(barWidth * index, height - y);
          canvas2d.stroke();
        })

        let max_val = -Infinity;
        let max_index = -1;
        for (let i = 0; i < dataArray.length; i++) {
          let barHeight = dataArray[i];
          if (barHeight > max_val) {
            max_val = barHeight;
            max_index = i;
          }
        }
        if (Math.random() < 0.01) {
          const hz1 = max_index * nyquist / dataArray.length;
          const hz2 = (max_index + 1) * nyquist / dataArray.length;
          console.log('captured', { max_index, max_val, hz1, hz2 })
        }

        canvas2d.strokeStyle = `teal`;
        canvas2d.beginPath();
        canvas2d.lineCap = "round";
        canvas2d.lineWidth = 8;
        canvas2d.moveTo(barWidth * max_index, height);
        canvas2d.lineTo(barWidth * max_index, height - (max_val / 255 * height));
        canvas2d.stroke();
      }
    });

  function dispose() {
    disposed = true;
  }

  return {
    // draw() does nothing because we're using requestAnimationFrame().
    // TODO: redesign runCanvasApp() so it can handle frames, or not.
    draw: () => { },
    dispose,
  };
}
