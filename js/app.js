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
const rows = [
              [0,1,2],
              [3,4,5],
              [6,7,8],
              [0,3,6],
              [1,4,7],
              [2,5,8],
              [0,4,8],
              [6,4,2]
             ];
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
    if (currentScores[i] === 3) {
      announceWin("Noughts",i);
    } else if (currentScores[i] === 30) {
      announceWin("Crosses",i);
    }
  }
}

const announceWin = (winningRow,i) => {
  gameArea.style.pointerEvents = "none"; 
  gameOverDiv = document.getElementsByClassName("result")[0];
  gameOverDiv.textContent = "Game Over - " + winningRow + " won!";
  gameOverDiv.style.display = "block";
  gameOver = true;
  for (let j = 0; j < rows[i].length; j++) {
    squares[rows[i][j]].classList.add("gameWon");
  }
}

gameArea.addEventListener('click', (event) => {
  let square = event.target;
  let justPlayed = parseInt(square.dataset.pos);
  playedSquares[justPlayed] = 1;
  keepScore();
  square.textContent = "O"; // Letter O, not zero
  detectWin();
  turns++;
  if (turns === 9 && !gameOver) {
    alert("Draw!");
  } else if (!gameOver) {
    appTakesATurn();
    keepScore();
    detectWin();
    turns++;
  }
});

