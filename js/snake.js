const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let running = false;
let pressed = false;

let snake = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    length: 3,
    speed: 5,
    margin: 3,
    size: 15,
    direction: [],
    body: []
};

const food = {
    size: 15
};

function randInt(lo, hi) {
    // returns a random integer between lo and hi, including lo but not hi
    return Math.floor((Math.random() * (hi - lo)) + lo);
}


function drawSnake() {
    context.fillStyle = '#ffffff';
    context.fillRect(snake.x, snake.y, snake.size, snake.size)

    for (let i = 0; i < snake.length; i++) {
        break;
    }
}

function drawFood() {
    context.fillStyle = '#ffffff';
    context.fillRect(random.x, random.y, food.size, food.size)
}

function drawMenu() {
    context.fillStyle = '#2c3e50';
    context.fillRect(canvas.width / 2 - 350, canvas.height / 2 - 50, 700, 100);

    context.fillStyle = '#ffffff';
    context.font = '40px Monaco';
    context.fillText('press any key to begin', canvas.width / 5 + 3, canvas.height / 2 + 10);
}

function render() {
    context.fillStyle = '#2c3e50';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawSnake();

    if (running === false) {
        drawMenu();
    }
}

function update() {
    // move snake
    if (snake.direction[0] === 'up') {
        snake.y -= snake.size;
    }
    else if (snake.direction[0] === 'down') {
        snake.y += snake.size;
    }
    else if (snake.direction[0] === 'left') {
        snake.x -= snake.size;
    }
    else if (snake.direction[0] === 'right') {
        snake.x += snake.size;
    }

    if (snake.direction.length > 1) {
        snake.direction.shift();
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
    }

    if (!pressed) {
        switch (event.keyCode) {
            // up arrow or w key
            case 38:
            case 87:
                if (snake.direction[snake.direction.length - 1] != 'up' && snake.direction[snake.direction.length - 1] != 'down') {
                    snake.direction.push('up');
                }
                break;
            
            // down arrow or s key
            case 40:
            case 83:
                if (snake.direction[snake.direction.length - 1] != 'down' && snake.direction[snake.direction.length - 1] != 'up') {
                    snake.direction.push('down');
                }                
                break;

            // left arrow or a key
            case 37:
            case 65:
                if (snake.direction[snake.direction.length - 1] != 'left' && snake.direction[snake.direction.length - 1] != 'right') {
                    snake.direction.push('left');
                }
                break;

            // right arrow or d key
            case 39:
            case 68:
                if (snake.direction[snake.direction.length - 1] != 'right' && snake.direction[snake.direction.length - 1] != 'left') {
                    snake.direction.push('right');
                }
                break;
        }
    }
}

// calls gameLoop() 60 times per second aka set game to run at 60 fps
setInterval(gameLoop, 1000 / snake.speed);