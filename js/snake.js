const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let running = false;

let snake = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    length: 3,
    speed: 7,
    margin: 3,
    size: 15,
    body: []
};

function drawSnake() {
    context.fillStyle = '#ffffff';
    context.fillRect(snake.x, snake.y, snake.size, snake.size)

    for (let i = 0; i < snake.length; i++) {
        //nake.body[i].x = 
    }
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
}

function update() {

}

function gameLoop() {
    if (running === true) {
        update();
    }

    render();
}

window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (running === false) {
        running = true;
    }
    
    console.log(event.keyCode);

    switch (event.keyCode) {
        
    }
}

function keyUpHandler(event) {
    switch (event.keyCode) {
        
    }
}

// calls gameLoop() 60 times per second aka set game to run at 60 fps
setInterval(gameLoop, 1000 / 60);