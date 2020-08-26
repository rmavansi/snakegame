export function setSpeed(difficultySelected) {
  if(difficultySelected==="Easy") return 250;
  if(difficultySelected==="Medium") return 150;
  if(difficultySelected==="Hard") return 100;
}

export function chooseDifficulty(btn) {
  difficulty.textContent = `Difficulty: ${btn.innerText}`;
  sessionStorage.setItem('snakeGameDifficulty', btn.innerText);
}

