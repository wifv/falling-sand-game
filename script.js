const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const cols = 100;
const rows = 100;
const cellSize = width / cols;

const grid = [];
for (let y = 0; y < rows; y++) {
  grid[y] = [];
  for (let x = 0; x < cols; x++) {
    grid[y][x] = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function update() {
  for (let y = rows - 2; y >= 0; y--) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        if (grid[y + 1][x] === 0) {
          grid[y + 1][x] = 1;
          grid[y][x] = 0;
        }
      }
    }
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const gridX = Math.floor(mouseX / cellSize);
  const gridY = Math.floor(mouseY / cellSize);

  if (event.buttons === 1) {
    grid[gridY][gridX] = 1;
  }

  if (event.buttons === 4) {
    grid[gridY][gridX] = 0;
  }
});

canvas.addEventListener('touchmove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.touches[0].clientX - rect.left;
  const mouseY = event.touches[0].clientY - rect.top;
  const gridX = Math.floor(mouseX / cellSize);
  const gridY = Math.floor(mouseY / cellSize);

  grid[gridY][gridX] = 1;
});


gameLoop();
