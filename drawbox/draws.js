const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let painting = false;

function startPosition(e) {
  painting = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  if (e.type === 'mousemove' || e.type === 'touchmove') {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  } else {
    ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
  }
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', draw);

function saveState() {
  const link = document.createElement('a');
  const fileName = prompt("Save as:", "drawing");
  link.href = canvas.toDataURL('image/png', 1.0);
  link.download = `${fileName}.png`;
  link.click();
}

document.getElementById('saveButton').addEventListener('click', saveState);