const whiteboard = document.getElementById("whiteboard");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");
const context = whiteboard.getContext("2d");
const drawingData = [];
let isDrawing = false;

whiteboard.width = window.innerWidth;
whiteboard.height = window.innerHeight;

whiteboard.addEventListener("mousedown", startDrawing);
whiteboard.addEventListener("mousemove", draw);
window.addEventListener("mouseup", stopDrawing); 
undoBtn.addEventListener("click", undo);
clearBtn.addEventListener("click", clearCanvas);

function startDrawing(event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.clientX, event.clientY);
  drawingData.push([{ x: event.clientX, y: event.clientY }]);
}

function draw(event) {
  if (!isDrawing) return;
  context.lineTo(event.clientX, event.clientY);
  context.stroke();
  drawingData[drawingData.length - 1].push({ x: event.clientX, y: event.clientY });
}

function stopDrawing() {
  isDrawing = false;
}

function undo() {
  if (drawingData.length > 0) {
    drawingData.pop();
    clearCanvas();
    redraw();
  }
}

function redraw() {
  drawingData.forEach(path => {
    context.beginPath();
    context.moveTo(path[0].x, path[0].y);
    path.forEach(point => context.lineTo(point.x, point.y));
    context.stroke();
  });
}

function clearCanvas() {
  context.clearRect(0, 0, whiteboard.width, whiteboard.height);
}
