const canvas = document.getElementById('snake');
const context = canvas.getContext('2d'); // give methods props

// base unit (px)
let box = 32;

// load imgs
let ground = new Image();
ground.src = 'css/img/trianglify.png';

//load audio files
let left = new Audio();
let right = new Audio();
let up = new Audio();
let down = new Audio();
let dead = new Audio();
let eat = new Audio();

left.src = 'css/audio/left.mp3';
right.src = 'css/audio/right.mp3';
up.src = 'css/audio/up.mp3';
down.src = 'css/audio/down.mp3';
dead.src = 'css/audio/dead.mp3';
eat.src = 'css/audio/eat.mp3';
// audioName.play();

let foodImage = new Image();
foodImage.src = 'css/img/ice-cream.png';

// components = snake && ground && food && score

// snake => array 
let snake = [];
snake[0] = { 
    x: 9 * box, 
    y: 10 * box 
};

// food be placed randomly on the canvas 
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box 
};

// score 
let score = 0;

let gameover = false;


// control the snake
let currentDirection;

let direction = (event) => {
    if (event.keyCode === 37 && currentDirection != 'RIGHT') {
        currentDirection = 'LEFT';
        // console.log('LEFT');
    }
    else if (event.keyCode === 38 && currentDirection !='DOWN') {
        currentDirection = 'UP';
        // console.log('UP');
    }
    else if (event.keyCode === 39 && currentDirection != 'LEFT') {
        currentDirection = 'RIGHT';
        // console.log('RIGHT');
    }
    else if (event.keyCode === 40 && currentDirection != 'UP') {
        currentDirection = 'DOWN';
        // console.log('DOWN');
    }
}

document.addEventListener('keydown', direction);


// draw images 
// context.drawImage(ImageName, x, y, width, height)
// context.drawImage(ImageName, 40, 50, 25, 25)

let draw = () => {
    context.drawImage(ground, 0 ,0);
    for (let i = 0; i < snake.length; i++) {
        // checks if the it is the head of the snake, head is blue, body is white
        context.fillStyle = ( i === 0) ? '#666A86' : '#E8DDB5';
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = '#273043';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // draws the food
    context.drawImage(foodImage, food.x, food.y); 

    snakeMovements();

    // draws the score
    // context.fillStyle = 'black';
    // context.font = "45px Changa One";
    // context.fillText(score, 2 * box, 1.6 * box);
}

let snakeMovements = () => {
    // old head positon
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // determine direction from user input
    if (currentDirection === 'LEFT') {
        snakeX -= box;
        left.play();
        // console.log('LEFT');
    }
    if (currentDirection === 'UP') {
        snakeY -= box;
        up.play();
        // console.log('UP');
    }
    if (currentDirection === 'RIGHT') {
        snakeX += box;
        right.play();
        // console.log('RIGHT');
    }
    if (currentDirection === 'DOWN') {
        snakeY += box;
        down.play();
        // console.log('DOWN');
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
        // don't remove tail
        console.log('food was eaten')
        eat.play();
        score++;
        document.getElementById('score').textContent = score;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box 
        };
    }
    else {
        // remove the tail 
        snake.pop();
    }


    // add new Head 
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // check for game over conditions => when it hit itself or the walls 
    if (checkCollision(newHead, snake) 
            || snakeX === -32 ||  snakeX === 19 * box
            || snakeY === 19 * box || snakeY === -32) {
        console.log('snake head itself');
        dead.play();
        clearInterval(game);
        // gameOver = true;
        // if (gameOver) {
        //     let resetGame = window.confirm(
        //         'Looks like you died. Do you want to try get more ice cream?')
        //     (resetGame)
        //         ? console.log(1)
        //         : console.log(2)
        // }
    }

    // add new head to front of the array
    snake.unshift(newHead);
}

// wall collision
// horizontal  0 -> 608
// veritall 0 -> 608
// snakeX === 0 || snakeX === 608
// snakeY === 0 || snakeY === 607

// check if the snake hits itself
function checkCollision(newSnakeHead, snake) {
    for ( let i = 0; i < snake.length; i++) {
        if (newSnakeHead.x === snake[i].x && 
            newSnakeHead.y === snake[i].y) {
                return true;
            }
    }
    return false;
}


let game = setInterval(draw, 110);
document.getElementById('score').textContent = score;



// $(document).ready(function(){
//     $('score').html(score);
// })



// draw rectangles 
// context.fillStyle = 'blue';
// // context.fillRect(x, y, width, height);
// context.fillRect(100, 300, 30, 30); 

// context.fillStyle = 'black';
// context.fillRect(5 * box, 6 * box, 2 * box, 3 * box);



// keycodes
// left = 37
// up = 38
// right = 39 
// down = 40


// snake moving 
// basic mechanic is to remove the last position 
// and add the new position at the front 
// Array.unshift(); adds a new head to Array
// Array.pop remove the last item in the Array

// snake.pop();


// game over conditions
// when snake hit itself
// when snake hits the walls 







// Things to do
// -alert window when game over to and allow user to restart 
// -controls via voice 
