const gameBoard = document.querySelector("#board");
const modalWindow = document.querySelector(".js-modal");

const info = document.querySelector(".info");
const modalInfo = document.querySelector('#modal_info')

const playerXScore = document.querySelector("#playerX_score");
const playerOScore = document.querySelector("#playerO_score");
const drawScore = document.querySelector("#draw");

const resetBtn = document.querySelector('button[data-action="reset-score"]');
const restartBtn = document.querySelector('button[data-action="restart-game"]');
const modalClose = document.querySelector('button[data-action="close-modal"]');

modalClose.addEventListener("click", onModalClose);
resetBtn.addEventListener("click", resetScore);
restartBtn.addEventListener("click", onModalClose);

let currentPlayer,
  board = [],
  drawScoreNum = 0,
  playerXScoreNum = 0,
  playerOScoreNum = 0;

function createGameBoard() {
  currentPlayer = "X";
  createBoardMarkup();
  gameBoard.addEventListener("click", handleCellClick);
  info.textContent = `${currentPlayer}'s turn`;
  gameBoard.innerHTML = "";

  for (let row = 0; row < 50; row++) {
    for (let col = 0; col < 50; col++) {
      const cell = document.createElement("div");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.classList.add("cell");
      gameBoard.appendChild(cell);
    }
  }
}

function createBoardMarkup() {
  board = [];
  for (let i = 0; i < 50; i++) {
    board.push(Array(50).fill(null));
  }
}

createGameBoard();

function updateTurn() {
  info.classList.remove(currentPlayer === "X" ? "cellX" : "cellO");
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  info.textContent = `${currentPlayer}'s turn`;
  info.classList.add(currentPlayer === "X" ? "cellX" : "cellO");
}

function handleCellClick(event) {
  const validValue = event.target.dataset.value;
  const isCell = event.target.classList.contains("cell");
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (!validValue && isCell) {
    if (board[row][col] === null) {
      board[row][col] = `${currentPlayer}`;
      event.target.dataset.value = currentPlayer;
      event.target.classList.add(currentPlayer === "X" ? "cellX" : "cellO");

      if (checkWinner()) {
        endGame(`Player ${currentPlayer} win`);
      } else if (boardIsFull()) {
        endGame("Tie game!");
      }
    }

    updateTurn();
  }
}

function endGame(message) {
  if (message === "Tie game!") {
    addDrawScore();
  }

  if (`Player ${currentPlayer} win`) {
    currentPlayer === "X" ? addPlayerXScore() : addPlayerOScore();
  }
  gameBoard.removeEventListener("click", handleCellClick);
  
openModal(message);
  
}

function boardIsFull() {
  for (let row = 0; row < 50; row++) {
    for (let col = 0; col < 50; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
}

function checkWinner() {
  // Check rows
  for (let row = 0; row < 50; row++) {
    for (let col = 0; col < 46; col++) {
      if (
        board[row][col] !== null &&
        board[row][col] === board[row][col + 1] &&
        board[row][col] === board[row][col + 2] &&
        board[row][col] === board[row][col + 3] &&
        board[row][col] === board[row][col + 4]
      ) {
        return board[row][col];
      }
    }
  }

  // Check columns
  for (let row = 0; row < 46; row++) {
    for (let col = 0; col < 50; col++) {
      if (
        board[row][col] !== null &&
        board[row][col] === board[row + 1][col] &&
        board[row][col] === board[row + 2][col] &&
        board[row][col] === board[row + 3][col] &&
        board[row][col] === board[row + 4][col]
      ) {
        return board[row][col];
      }
    }
  }

  // Check diagonals (top-left to bottom-right)
  for (let row = 0; row < 46; row++) {
    for (let col = 0; col < 46; col++) {
      if (
        board[row][col] !== null &&
        board[row][col] === board[row + 1][col + 1] &&
        board[row][col] === board[row + 2][col + 2] &&
        board[row][col] === board[row + 3][col + 3] &&
        board[row][col] === board[row + 4][col + 4]
      ) {
        return board[row][col];
      }
    }
  }

  // Check diagonals (top-right to bottom-left)
  for (let row = 0; row < 46; row++) {
    for (let col = 49; col >= 4; col--) {
      if (
        board[row][col] !== null &&
        board[row][col] === board[row + 1][col - 1] &&
        board[row][col] === board[row + 2][col - 2] &&
        board[row][col] === board[row + 3][col - 3] &&
        board[row][col] === board[row + 4][col - 4]
      ) {
        return board[row][col];
      }
    }
  }

  return null;
}

function restartGame() {
  info.textContent = 'Loading..';
  info.classList.remove(currentPlayer === "X" ? "cellX" : "cellO");
  setTimeout(createGameBoard, 1000)
}

function onModalClose() {
  modalWindow.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  restartGame();
}

function openModal(msg) {
  modalWindow.classList.add("is-open");
  document.body.classList.add("modal-open");
  modalInfo.textContent = `${msg}`;
}

function addPlayerXScore() {
  playerXScoreNum += 1;
  playerXScore.textContent = `${playerXScoreNum}`;
}

function addPlayerOScore() {
  playerOScoreNum += 1;
  playerOScore.textContent = `${playerOScoreNum}`;
}

function addDrawScore() {
  drawScoreNum += 1;
  drawScore.textContent = `${drawScoreNum}`;
}

function resetScore() {
  drawScoreNum = 0;
  playerXScoreNum = 0;
  playerOScoreNum = 0;
  drawScore.textContent = `${drawScoreNum}`;
  playerXScore.textContent = `${playerXScoreNum}`;
  playerOScore.textContent = `${playerOScoreNum}`;
}