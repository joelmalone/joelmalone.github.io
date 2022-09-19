
export function startCanvasApp(
  context2d: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) {
  function draw() {
    context2d.moveTo(10, 10);
    context2d.lineTo(123, 456);
    context2d.lineTo(456, 123);
    context2d.strokeStyle = "slateblue";
    context2d.stroke();
  }

  var interval = setInterval(() => {
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
