// Use const instead of let for constants
const numBalls = document.querySelector("#numBalls");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const canvas = document.createElement("canvas");

canvas.classList.add("canvas");
canvas.width = window.innerWidth * 0.97;
canvas.height = 600;

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
const balls = [];

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);

function start() {
  const numBallsValue = parseInt(numBalls.value, 10);

  if (balls.length === 0) {
    for (let i = 0; i < numBallsValue; i++) {
      const radius = random(10, 20);

      balls.push(new Ball(
        random(radius, canvas.width - radius),
        random(radius, canvas.height - radius),
        radius
      ));
    }
  }

  animate();
}

function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.length = 0;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < balls.length; j++) {
      if (i !== j && distance(balls[i], balls[j]) < getDistance()) {
        connect(balls[i], balls[j]);
      }
    }

    balls[i].move();
    balls[i].draw();
  }

  requestAnimationFrame(animate);
}

function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.vx = random(-1.5, 1.5);
  this.vy = random(-1.5, 1.5);
  this.color = '#71f5cb';

  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  };

  this.move = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }
  };
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function distance(b1, b2) {
  const xDist = b1.x - b2.x;
  const yDist = b1.y - b2.y;

  return Math.sqrt(xDist ** 2 + yDist ** 2);
}

function connect(b1, b2) {
  ctx.beginPath();
  ctx.strokeStyle = "#FFFF00";
  ctx.moveTo(b1.x, b1.y);
  ctx.lineTo(b2.x, b2.y);
  ctx.stroke();
}

function getDistance() {
  return parseInt(document.getElementById("dist").value, 10);
}