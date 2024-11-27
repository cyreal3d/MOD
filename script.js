
const canvas = document.getElementById('appleCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Apple image
const appleImage = new Image();
appleImage.src = 'apple.png'; // Add an apple image in the project folder

// Apple class
class Apple {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx; // Horizontal velocity
    this.dy = dy; // Vertical velocity
  }

  draw() {
    ctx.drawImage(appleImage, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }

  update() {
    this.y += this.dy;
    this.x += this.dx;

    // Bounce off walls
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx *= -1;
    }

    // Bounce off floor and ceiling
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy *= -1;
    }

    this.draw();
  }
}

// Create apples
const apples = [];
for (let i = 0; i < 20; i++) {
  const radius = 30;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const dx = (Math.random() - 0.5) * 4; // Random horizontal velocity
  const dy = (Math.random() - 0.5) * 4; // Random vertical velocity
  apples.push(new Apple(x, y, radius, dx, dy));
}

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  apples.forEach(apple => apple.update());
  requestAnimationFrame(animate);
}

appleImage.onload = animate;
