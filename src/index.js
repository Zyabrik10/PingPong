let canvas,
  ctx,
  startGameButton,
  startGameScreen,
  keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false,
  };

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randFrom = (...arr) => arr[Math.floor(Math.random() * arr.length)];

class Player {
  constructor({ name, color }) {
    this.name = name;
    this.color = color;
    this.size = {
      width: 10,
      height: 140,
    };
    this.vy = 30;
    this.score = 0;
  }

  init({ coor, scoreElement }) {
    this.coor = coor;
    this.scoreElement = scoreElement;
  }

  draw() {
    const { x, y } = this.coor;
    const { width, height } = this.size;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, width, height);
    this.scoreElement.innerText = this.score;
  }
}

class Ball {
  constructor({ color }) {
    this.color = color;
    this.size = {
      width: 10,
      height: 10,
    };
    this.v = {
      x: randInt(10, 20) * randFrom(-1, 1),
      y: randInt(10, 20) * randFrom(-1, 1),
    };
  }

  init({ coor }) {
    this.coor = coor;
  }

  draw() {
    const { x, y } = this.coor;
    const { width } = this.size;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(x, y, width, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

let player1 = new Player({
  name: "Player1",
  color: "white",
});

let player2 = new Player({
  name: "Player1",
  color: "white",
});

let ball = new Ball({
  color: "white",
});

function animate() {
  if (keys.w && player1.coor.y >= 0) {
    player1.coor.y += -player1.vy;
  } else if (keys.s && player1.coor.y + player1.size.height <= canvas.height) {
    player1.coor.y += player1.vy;
  }

  if (keys.ArrowUp && player2.coor.y >= 0) {
    player2.coor.y += -player2.vy;
  } else if (
    keys.ArrowDown &&
    player2.coor.y + player2.size.height <= canvas.height
  ) {
    player2.coor.y += player2.vy;
  }

  ball.coor.y += ball.v.y;
  ball.coor.x += ball.v.x;

  if (
    ball.coor.y - ball.size.height < 0 ||
    ball.coor.y + ball.size.height > canvas.height
  ) {
    ball.v.y *= -1;
  }

  if (ball.coor.x - ball.size.width < 0) {
    ball.v.x *= -1;
    ball.coor.x = canvas.width / 2;
    ball.coor.y = canvas.height / 2;
    ball.v.y = 10;
    ball.v.y *= randFrom(-1, 1);
    player2.score++;
  }

  if (ball.coor.x + ball.size.width > canvas.width) {
    ball.coor.x = canvas.width - ball.size.width;
    ball.v.x *= -1;
    ball.coor.x = canvas.width / 2;
    ball.coor.y = canvas.height / 2;
    ball.v.y = 10;
    ball.v.y *= randFrom(-1, 1);
    player1.score++;
  }

  if (
    (ball.coor.x - ball.size.width <= player1.coor.x + player1.size.width &&
      ball.coor.y - ball.size.height >= player1.coor.y &&
      ball.coor.y + ball.size.height <= player1.coor.y + player1.size.height) ||
    (ball.coor.x + ball.size.width >= player2.coor.x &&
      ball.coor.y - ball.size.height >= player2.coor.y &&
      ball.coor.y + ball.size.height <= player2.coor.y + player2.size.height)
  ) {
    ball.v.x *= -1;
    ball.v.y *= 1.2;
  }

  player1.draw();
  player2.draw();
  ball.draw();
}

function convertFPSToMs(fps) {
  return fps > 0 ? 1000 / fps : 16;
}

let timer = 0,
  fps = 100,
  currentTime = 0,
  deltaTime = 0;

function update(timeStamp) {
  deltaTime = timeStamp - currentTime;
  currentTime = timeStamp;
  if (timer >= convertFPSToMs(fps)) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animate();
    timer = 0;
  } else timer += deltaTime;

  requestAnimationFrame(update);
}

window.addEventListener("load", function () {
  startGameButton = document.querySelector(".start-game-button");
  startGameScreen = document.querySelector(".screen.start-game");

  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let halfCanvasWidth = canvas.width / 2;
  let halfCanvasHeight = canvas.height / 2;

  player1.init({
    coor: {
      x: 0,
      y: halfCanvasHeight - player1.size.height / 2,
    },
    scoreElement: document.querySelector(".player1-score"),
  });
  player2.init({
    coor: {
      x: canvas.width - player2.size.width,
      y: halfCanvasHeight - player2.size.height / 2,
    },
    scoreElement: document.querySelector(".player2-score"),
  });
  ball.init({
    coor: {
      x: halfCanvasWidth,
      y: halfCanvasHeight,
    },
  });

  // update(0);
  animate();

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let halfCanvasHeight = canvas.height / 2;

    player1.init({
      coor: {
        x: 0,
        y: halfCanvasHeight - player1.size.height / 2,
      },
    });
    player2.init({
      coor: {
        x: canvas.width - player2.size.width,
        y: halfCanvasHeight - player2.size.height / 2,
      },
    });
  });

  window.addEventListener("keydown", ({ key }) => {
    if (keys.hasOwnProperty(key)) {
      keys[key] = true;
    }
  });

  window.addEventListener("keyup", ({ key }) => {
    if (keys.hasOwnProperty(key)) {
      keys[key] = false;
    }
  });

  startGameButton.addEventListener("click", () => {
    update(0);
    startGameScreen.classList.add("hidden");
  });
});
