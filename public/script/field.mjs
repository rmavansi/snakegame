let food = {
  x: 0,
  y: 0
}

export function background(context, box, difficulty) {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
    if(difficulty==="Hard") {
      const centerCollision = {
        x: 7 * box,
        y: 7 * box
      }
      context.fillStyle = "red";

      context.fillRect(0, 0, 16 * box, box);
      context.fillRect(0, 0, box, 16 * box);
      context.fillRect(15 * box, 0, box, 16 * box);
      context.fillRect(0, 15 * box, 16 * box, box);

      context.fillRect(centerCollision.x, centerCollision.y, 2 * box, 2 * box);
    }
}

export function checkIfHitBoxHardMode(snake, box) {
  if(snake.x === 0 || snake.x === 15 * box || snake.y === 0 || snake.y === 15 * box) {
    return true;
  }

  if((snake.x === 7 * box && snake.y === 7 * box)  ||
      (snake.x === 8 * box && snake.y === 7 * box) ||
      (snake.x === 7 * box && snake.y === 8 * box) ||
      (snake.x === 8 * box && snake.y === 8 * box)) return true;
}

export function createSnake(context, snake, box) {
  for(let i=0; i<snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

export function drawFood(context, box) {
  context.fillStyle = "blue";
  context.fillRect(food.x, food.y, box, box);
}

export function generateFood(box) {
  food.x = Math.floor(Math.random() * 15 + 1) * box,
  food.y = Math.floor(Math.random() * 15 + 1) * box
  if(checkIfHitBoxHardMode(food, box)){
    generateFood(box);
  }
}

export function foodPosition() {
  return food;
}

export function checkBounds(snake, direction, box) {
  if(snake.x > 15 * box && direction == "right") return snake.x = 0;
  if(snake.x < 0 && direction == 'left') return snake.x = 16 * box;
  if(snake.y > 15 * box && direction == "down") return snake.y = 0;
  if(snake.y < 0 && direction == 'up') return snake.y = 16 * box;
}
