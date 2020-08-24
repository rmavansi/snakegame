const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

const score = document.getElementById("score");
const highScore = document.getElementById("highScore");
highScore.textContent = localStorage.getItem("highScore") | "0"

document.addEventListener('keydown', updateDirection);

const box = 32;
let snake = [];
let direction = "";
let points = 0;

snake[0] ={
  x: 1 * box,
  y: 1 * box
}

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG(){
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for(i=0; i<snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawFood () {
  context.fillStyle = "blue";
  context.fillRect(food.x, food.y, box, box);
}

function movement(snakeX, snakeY) {
  if(direction == "right") return [snakeX += box, snakeY];
  if(direction == "left") return [snakeX -= box, snakeY];
  if(direction == "up") return [snakeX, snakeY -= box];
  if(direction == "down") return [snakeX, snakeY += box];
}

function updateDirection(event) {
  if(event.keyCode == 37 && direction != "right") direction="left";
  if(event.keyCode == 38 && direction != "down") direction="up";
  if(event.keyCode == 39 && direction != "left") direction="right";
  if(event.keyCode == 40 && direction != "up") direction="down";
}

function init() {
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  for(i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        if(parseInt(highScore.textContent, 10) < parseInt(score.textContent, 10)) localStorage.setItem('highScore', points)
        clearInterval(game);
        let gameOver = document.getElementById("gameOver");
        gameOver.textContent = "GAME OVER!";
        gameOver.style.visibility = "visible";
    }
  }

  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  [snakeX, snakeY] = movement(snakeX, snakeY);

  if(snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 +1) * box;
    food.y = Math.floor(Math.random() * 15 +1) * box;

    score.textContent = ++points;
  }

  // new Head
  snake.unshift({
    x: snakeX,
    y: snakeY
  });
}

let game = setInterval(init, 100);
