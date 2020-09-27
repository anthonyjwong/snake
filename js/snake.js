const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let running = false;
let foodExists = false;

let snake = {
  speed: 5,
  margin: 3,
  size: 15,
  direction: [],
  body: [
    { x: 255, y: 183 },
    { x: 237, y: 183 },
    { x: 219, y: 183 },
  ],
  score: 0,
};

const food = {
    x: 0,
    y: 0,
    exists: false,
    size: 15,
    color: "#e74c3c",
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

function generateCoords() {
    // generates a random valid coordinate pair
    let x = randInt(0, 900);
    x = (Math.floor(x / 18) * 18) + 3

    let y = randInt(0, 612); 
    y = (Math.floor(y / 18) * 18) + 3;

    return [x, y];
}

function drawSnake() {
    context.fillStyle = '#ffffff';

    for (let i = 0; i < snake.body.length; i++) {
         context.fillRect(snake.body[i].x, snake.body[i].y, snake.size, snake.size);
    }
}

function drawFood() {
    context.fillStyle = food.color;
    
    // generate random coordinates for food if the food doesn't exist already
    if (!foodExists) {
        coords = generateCoords();

        food.x = coords[0];
        food.y = coords[1];

        foodExists = true;
    }
   
    context.fillRect(food.x, food.y, food.size, food.size);
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
    // only remembers past 3 inputs, so key spamming doesn't ruin movement
    if (snake.direction.length < 3) {
        if (snake.direction[snake.direction.length - 1] != dir && snake.direction[snake.direction.length - 1] != opposite[dir]) {
            snake.direction.push(dir);
        }
    }
}

function eat() {
    foodExists = false;
    
    //ensures that food isn't eaten more than once
    food.x = -18;
    food.y = -18;

    // increase score
    snake.score += 100;

    // add segment to snake
    let lastSegment = snake.body[snake.length - 1];
    let secondToLastSegment = snake.body[snake.length - 2];

    if (secondToLastSegment.x > lastSegment.x) {
        snake.body.push({ x: snake.body[0].x + 18, y: snake.body[0].y });
    }
    else if (secondToLastSegment.y > lastSegment.y) {
        snake.body.push({ x: snake.body[0].x, y: snake.body[0].y + 18 });
    }
    else if (secondToLastSegment.x < lastSegment.x) {
        snake.body.push({ x: snake.body[0].x - 18, y: snake.body[0].y });
    }
    else if (secondToLastSegment.y < lastSegment.y) {
      snake.body.push({ x: snake.body[0].x, y: snake.body[0].y - 18 });
    }

    // game isn't getting faster atm
    snake.speed += 1;
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

    // makes sure that snake has a direction to move in
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

    // food generation
    drawFood();

    if (head.x === food.x && head.y === food.y) {
        eat();
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