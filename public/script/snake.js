import { moveSnake, updateDirection} from './movement.mjs';
import { background, createSnake, drawFood, generateFood, foodPosition, checkBounds, checkIfHitBoxHardMode } from './field.mjs';
import { chooseDifficulty, setSpeed } from './difficulty.mjs';

// Canvas
const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

let game;
let direction = "right";
let diff;
const box = 32;

// Storage
const score = document.getElementById("score");
const highScore = document.getElementById("highScore");
highScore.textContent = localStorage.getItem("snakeGameHighScore") || "0";

// Event press button
document.addEventListener('keydown', () => direction = updateDirection(event, direction));

const menu = document.getElementById("menu");

const difficulty = document.getElementById("difficulty");
difficulty.textContent = `Difficulty: ${sessionStorage.getItem("snakeGameDifficulty") || "Easy"}`;

// Choose difficulty buttons
const btnEasy = document.getElementById("btnEasy");
btnEasy.addEventListener('click', () => chooseDifficulty(btnEasy));

const btnMedium = document.getElementById("btnMedium");
btnMedium.addEventListener('click', () => chooseDifficulty(btnMedium));

const btnHard = document.getElementById("btnHard");
btnHard.addEventListener('click', () => chooseDifficulty(btnHard));

// Page reload
const gameOver = document.getElementById("gameOver");
gameOver.addEventListener('click', () => {
  window.location.reload();
});

// Start game
const start = document.getElementById("btnStart");
start.addEventListener('click', () => {
  menu.style.visibility = "hidden";
  diff = sessionStorage.getItem('snakeGameDifficulty') || "Easy";
  game = setInterval(init, setSpeed(diff));
});

let snake = [];
let points = 0;

snake[0] ={
  x: 1 * box,
  y: 1 * box
}

generateFood(box);

function gameOverAction() {
  if(parseInt(highScore.textContent, 10) < parseInt(score.textContent, 10)) localStorage.setItem('snakeGameHighScore', points)
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
  if(diff==="Hard") {
    if(checkIfHitBoxHardMode(snake[0], box)) gameOverAction();
  }

  background(context, box, diff);
  createSnake(context, snake, box);
  drawFood(context, box);

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
