export function moveSnake(direction, box, snakeX, snakeY) {
  if(direction == "right") return [snakeX += box, snakeY];
  if(direction == "left") return [snakeX -= box, snakeY];
  if(direction == "up") return [snakeX, snakeY -= box];
  if(direction == "down") return [snakeX, snakeY += box];
}

export function updateDirection(event, direction) {
  event.preventDefault();
  if(event.keyCode == 37 && direction != "right") return direction="left";
  if(event.keyCode == 38 && direction != "down") return direction="up";
  if(event.keyCode == 39 && direction != "left") return direction="right";
  if(event.keyCode == 40 && direction != "up") return direction="down";
  return direction;
}

