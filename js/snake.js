const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let running = false;

let snake = {
  length: 3,
  speed: 5,
  margin: 3,
  size: 15,
  direction: [],
  body: [
    { x: 255, y: 183 },
    { x: 237, y: 183 },
    { x: 219, y: 183 },
  ]
};

const food = {
    exists: false,
    size: 15
};

const opposite = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
};

function randInt(lo, hi) {
    // returns a random integer between lo and hi, including lo but not hi
    return Math.floor((Math.random() * (hi - lo)) + lo);
}

function drawSnake() {
    context.fillStyle = '#ffffff';

    for (let i = 0; i < snake.body.length; i++) {
         context.fillRect(snake.body[i].x, snake.body[i].y, snake.size, snake.size);
    }
}

function drawFood() {
    
}

function drawMenu() {
    context.fillStyle = '#2c3e50';
    context.fillRect(canvas.width / 2 - 350, canvas.height / 2 - 50, 700, 100);

    context.fillStyle = '#ffffff';
    context.font = '40px Monaco';
    context.fillText('press any key to begin', canvas.width / 5 + 3, canvas.height / 2 + 10);
}

/* figure out game over stuff later */
function gameOver() {
    // context.fillStyle = "#2c3e50";
    // context.fillRect(canvas.width / 2 - 350, canvas.height / 2 - 50, 700, 100);

    // context.fillStyle = "#ffffff";
    // context.font = "40px Monaco";
    // context.fillText("game over", canvas.width / 3 + 35, canvas.height / 2 + 100);

    // running = false;
    // setTimeout(gameLoop, 3000);
}

function moveSnake(dir) {
    // only remembers past 3 inputs, so key spamming doesn't ruin the movement
    if (snake.direction.length < 3) {
        if (snake.direction[snake.direction.length - 1] != dir && snake.direction[snake.direction.length - 1] != opposite[dir]) {
            snake.direction.push(dir);
        }
    }
}

function eat() {

}

function render() {
    context.fillStyle = '#2c3e50';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawSnake();

    drawFood();

    if (running === false) {
        drawMenu();
    }
}

function update() {
    // move snake
    if (snake.direction[0] === 'up') {
        snake.body.pop();
        snake.body.unshift({ x: snake.body[0].x, y: (snake.body[0].y - 18) });
    }
    else if (snake.direction[0] === 'down') {
        snake.body.pop();
        snake.body.unshift({ x: snake.body[0].x, y: (snake.body[0].y + 18) });
    }
    else if (snake.direction[0] === 'left') {
        snake.body.pop();
        snake.body.unshift({ x: snake.body[0].x - 18, y: (snake.body[0].y) });
    }
    else if (snake.direction[0] === 'right') {
        snake.body.pop();
        snake.body.unshift({ x: snake.body[0].x + 18, y: (snake.body[0].y) });
    }

    if (snake.direction.length > 1) {
        snake.direction.shift();
    }

    // wall collision detection
    let head = snake.body[0];
    if (head.x < 0) {
        console.log('off left')
        gameOver();
    }
    else if (head.x + snake.size > canvas.width) {
        console.log("off right");
        gameOver();
    }
    else if (head.y < 0) {
        console.log("off top");
        gameOver();
    }
    else if (head.y + snake.size > canvas.height) {
        console.log("off bottom");
        gameOver();
    }
}

function gameLoop() {
    if (running === true) {
        update();
    }

    render();
}

window.addEventListener('keydown', keyDownHandler);

function keyDownHandler(event) {
    if (running === false) {
        running = true;
        snake.direction.push("right");
    }
    else{
        switch (event.keyCode) {
          // up arrow or w key
          case 38:
          case 87:
            moveSnake('up');
            break;

          // down arrow or s key
          case 40:
          case 83:
            moveSnake('down');
            break;

          // left arrow or a key
          case 37:
          case 65:
            moveSnake('left');
            break;

          // right arrow or d key
          case 39:
          case 68:
            moveSnake('right');
            break;
        }
    }
}

// calls gameLoop() 60 times per second aka set game to run at 60 fps
setInterval(gameLoop, 1000 / snake.speed);