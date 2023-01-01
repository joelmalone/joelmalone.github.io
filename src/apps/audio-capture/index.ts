
export function startCanvasApp(
  canvas2d: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) {
  let disposed = false;
  const disposers: (() => void)[] = [];

  if (!navigator.mediaDevices?.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
  } else {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        if (disposed) {
          return;
        }

        const audioDevices = devices
          .filter(device => device.kind === 'audioinput')
          .map(({ label }) => label)
        console.log('enumerateDevices() returned the following audio input devices.', audioDevices)
      })
  }

  const mediaStreamPromise = navigator.mediaDevices.getUserMedia({
    audio: true
  })

  mediaStreamPromise
    .then(stream => {
      console.log('getUserMedia() returned.', stream)

      const analyser = startAnalyser(stream)
      disposers.push(analyser.dispose)

      function frame() {
        if (!disposed) {
          const dataArray = analyser.getFrequencyData()
          drawVisualizer(canvas2d, dataArray, canvasElement.width, canvasElement.height)
          requestAnimationFrame(frame)
        }
      }

      frame()
    });

  function onAudioCaptured(blob: Blob) {
    console.log('Audio captured!', blob)
  }

  mediaStreamPromise
    .then(stream => {
      const disposeInputListener = createInputListener(
        () => {
          return startSingleAudioCapture(stream, onAudioCaptured)
        },
        (disposeAudioCapture) => {
          disposeAudioCapture()
        }
      )

      disposers.push(disposeInputListener)
    })

  function dispose() {
    disposed = true;
    disposers.forEach(d => d())
  }

  return {
    // draw() does nothing because we're using requestAnimationFrame().
    // TODO: redesign runCanvasApp() so it can handle frames, or not.
    draw: () => { },
    dispose,
  };
}

function startAnalyser(stream: MediaStream) {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
  analyser.fftSize = 32768;

  const mediaStreamSource = audioContext.createMediaStreamSource(stream);
  mediaStreamSource.connect(analyser);

  /*      
  These ranges are spread out in the spectrum [0,Nyquist frequency]. The 
  Nyquist frequency is one-half of the sample rate. So if your
  AudioContext.sampleRate is 48000 (Hertz), your frequency bins will range
  across [0,24000] (also in Hz).

  https://stackoverflow.com/a/44504975/246901
  */
  const nyquist = audioContext.sampleRate / 2;

  console.log(
    'Audio initialised.',
    {
      fftSize: analyser.fftSize,
      frequencyBinCount: analyser.frequencyBinCount,
      sampleRate: audioContext.sampleRate,
    })

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function getFrequencyData() {
    analyser.getByteFrequencyData(dataArray);
    return dataArray
  }

  function dispose() {
    mediaStreamSource.disconnect(analyser);
  }

  return { getFrequencyData, dispose }
}

function drawVisualizer(canvas2d: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) {
  const barWidth = width / dataArray.length;

  canvas2d.clearRect(0, 0, width, height);
  dataArray.forEach((item, index) => {
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
  // if (Math.random() < 0.01) {
  //   const hz1 = max_index * nyquist / dataArray.length;
  //   const hz2 = (max_index + 1) * nyquist / dataArray.length;
  //   console.log('captured', { max_index, max_val, hz1, hz2 })
  // }

  canvas2d.strokeStyle = `teal`;
  canvas2d.beginPath();
  canvas2d.lineCap = "round";
  canvas2d.lineWidth = 8;
  canvas2d.moveTo(barWidth * max_index, height);
  canvas2d.lineTo(barWidth * max_index, height - (max_val / 255 * height));
  canvas2d.stroke();
}

function createInputListener<T>(
  onRecordingStarted: (stopRecording: () => void) => T,
  onRecordingStopped: (data: T) => void
) {
  let state: {
    data: T
  } | null = null

  function startRecording() {
    if (state !== null) {
      return;
    }

    const data = onRecordingStarted(stopRecording)
    state = { data }
  }

  function stopRecording() {
    if (state === null) {
      return;
    }

    onRecordingStopped(state.data)
    state = null
  }

  function onKeyDown(ev: KeyboardEvent) {
    if (ev.key === ' ') {
      startRecording();
    }
  }

  function onKeyUp(ev: KeyboardEvent) {
    if (ev.key === ' ') {
      stopRecording()
    }
  }

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  return function dispose() {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
  }
}

function startSingleAudioCapture(stream: MediaStream, onCaptured: (blob: Blob) => void) {
  // https://web.dev/media-recording-audio/
  const chunkBlobs: Blob[] = [];
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.addEventListener(
    'start',
    function () {
      console.log('mediaRecorder started.')
    });

  mediaRecorder.addEventListener(
    'dataavailable',
    function (ev) {
      console.log('DATAAVAILABLE')
      if (ev.data.size > 0) {
        chunkBlobs.push(ev.data);
      }
    });

  mediaRecorder.addEventListener(
    'stop',
    function () {
      console.log('mediaRecorder stopped.')

      const captureBlob = new Blob(chunkBlobs)

      console.log('capture completed', { mediaRecorder, chunkBlobs, captureBlob })
    });

  mediaRecorder.addEventListener(
    'error',
    function (err) {
      console.error('mediaRecorder error', err)
    });

  mediaRecorder.start();

  console.log('capture started.')

  function stop() {
    mediaRecorder.stop();
  }

  return stop
}