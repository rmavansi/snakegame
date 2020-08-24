import { moveSnake, updateDirection} from './movement.mjs';
import { background, createSnake, drawFood, generateFood, foodPosition, checkBounds, checkIfHitBoxHardMode } from './field.mjs';

const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

let speed = 250;
let game;
let direction = "right";

const score = document.getElementById("score");
const highScore = document.getElementById("highScore");
highScore.textContent = localStorage.getItem("highScore") | "0"

document.addEventListener('keydown', () => direction = updateDirection(event, direction));

const difficulty = document.getElementById("difficulty");

let df = "Easy";

function choosedifficulty(btn) {
  difficulty.textContent = `Difficulty: ${btn.innerText}`;
  df = btn.innerText;
  if(btn.innerText==="Easy") speed = 250;
  if(btn.innerText==="Medium") speed = 150;
  if(btn.innerText==="Hard") speed = 100;
}

// Choose difficulty
const btnEasy = document.getElementById("btnEasy");
btnEasy.addEventListener('click', () => choosedifficulty(btnEasy));

const btnMedium = document.getElementById("btnMedium");
btnMedium.addEventListener('click', () => choosedifficulty(btnMedium));

const btnHard = document.getElementById("btnHard");
btnHard.addEventListener('click', () => choosedifficulty(btnHard));

// Page reload
const gameOver = document.getElementById("gameOver");
gameOver.addEventListener('click', () => {
  window.location.reload();
});

// Start game
const start = document.getElementById("btnStart");
start.addEventListener('click', () => {
  game = setInterval(init, speed);
});

const box = 32;
let snake = [];
let points = 0;

generateFood(box);

snake[0] ={
  x: 1 * box,
  y: 1 * box
}

function gameOverAction() {
  if(parseInt(highScore.textContent, 10) < parseInt(score.textContent, 10)) localStorage.setItem('highScore', points)
  clearInterval(game);
  gameOver.textContent = "GAME OVER!";
  gameOver.innerHTML += '<p>Press to reload</p>';
  gameOver.style.visibility = "visible";
}

function init() {
  checkBounds(snake[0], direction, box);

  for(let i = 1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        gameOverAction();
    }
  }

  // check hitbox
  if(df==="Hard") {
    if(checkIfHitBoxHardMode(snake[0], box)) gameOverAction();
  }


  background(context, box, df);
  createSnake(context, snake, box);
  drawFood(context, box);
  // drawCenterCollision();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  [snakeX, snakeY] = moveSnake(direction, box, snakeX, snakeY);

  if(snakeX != foodPosition().x || snakeY != foodPosition().y) {
    snake.pop();
  } else {
    generateFood(box);
    score.textContent = ++points;
  }

  // new Head
  snake.unshift({
    x: snakeX,
    y: snakeY
  });
}
