const gameArea = document.getElementById("gameArea");
const squares = document.getElementsByClassName("gameSquare");
let gameOver = false;
let currentScores = [
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0,
                      0
                    ];
let turns = 0;
let playedSquares = [0,
                     0,
                     0,
                     0,
                     0,
                     0,
                     0,
                     0,
                     0];

const appTakesATurn = () => {
  let freeSquares = [];
  for (let i = 0; i < playedSquares.length; i++) {
    if (0 === playedSquares[i]) {
      freeSquares.push(squares[i]);
    }  
  }
  const appsTurn = Math.floor(Math.random() * freeSquares.length);
  xSquare = freeSquares[appsTurn];
  xSquare.textContent = "X";
  appPlayedIndex = parseInt(xSquare.dataset.pos);
  playedSquares[appPlayedIndex] = 10;
}

const keepScore = () => {
  currentScores[0] = playedSquares[0] + playedSquares [1] + playedSquares[2];
  currentScores[1] = playedSquares[3] + playedSquares [4] + playedSquares[5];
  currentScores[2] = playedSquares[6] + playedSquares [7] + playedSquares[8];
  currentScores[3] = playedSquares[0] + playedSquares [3] + playedSquares[6];
  currentScores[4] = playedSquares[1] + playedSquares [4] + playedSquares[7];
  currentScores[5] = playedSquares[2] + playedSquares [5] + playedSquares[8];
  currentScores[6] = playedSquares[0] + playedSquares [4] + playedSquares[8];
  currentScores[7] = playedSquares[6] + playedSquares [4] + playedSquares[2];
}

const detectWin = () => {
  for (let i = 0; i < currentScores.length; i++) {
    if (currentScores[i] === 3 || currentScores[i] === 30) {
      announceWin("**somebody**");
      gameOver = true;
    }
  }
}

const announceWin = (winningRow) => {
  gameArea.style.pointerEvents = "none"; 
  gameOverDiv = document.getElementsByClassName("result")[0];
  gameOverDiv.textContent = "Game Over - " + winningRow + " won!";
  gameOverDiv.style.display = "block";
  // ToDo: pass in an actual row of elements and use element.classList.add("gameWon");
}

gameArea.addEventListener('click', (event) => {
  let square = event.target;
  let justPlayed = parseInt(square.dataset.pos);
  playedSquares[justPlayed] = 1;
  keepScore();
  square.textContent = "O"; // Letter O, not zero
  detectWin();
  turns++;
  if (turns === 9) {
    alert("Draw!");
  } else if (!gameOver) {
    appTakesATurn();
    keepScore();
    detectWin();
    turns++;
  }
});

