const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let turn = 0; //0 user, 1 = pc

function renderBoard() {
  const html = board.map((row) => {
    const cells = row.map((cell) => {
      return `<button class="cell">${cell}</button>`;
    });
    return `<div class="row">${cells.join("")}</div>`;
  });

  document.querySelector("#board").innerHTML = html.join("");
}

startGame();

function startGame() {
  renderBoard();
  turn = Math.random() <= 0.5 ? 0 : 1;
  renderPlayer();

  if (turn === 0) {
    playerPlays();
  } else {
    PCPlays();
  }
}

function renderPlayer() {
  document.querySelector("#player").textContent = `${
    turn === 0 ? "Player turn" : "PC turn"
  }`;
}

function PCPlays() {
  console.log("PC Plays... ");
  let played = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "" && !played) {
        board[i][j] = "X";
        played = true;
      }
    }
  }
  turn = 0;
  renderBoard();
  renderPlayer();
  const won = checkIfWinner();
  debugger;
  if (won === "none") {
    playerPlays();
  }
}

function playerPlays() {
  console.log("player plays");

  document.querySelectorAll(".cell").forEach((buttonCell, i) => {
    const row = i % 3;
    const column = parseInt(i / 3);
    if (board[column][row] === "") {
      buttonCell.addEventListener("click", (e) => {
        board[column][row] = "O";
        buttonCell.textContent = board[column][row];
        turn = 1;
        const won = checkIfWinner();
        debugger;
        if (won === "none") {
          PCPlays();
        }
      });
    }
  });
}

function checkIfWinner() {
  const PCWon = [
    board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X",
    board[2][0] === "X" && board[1][1] === "X" && board[0][2] === "X",
    board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X",
    board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X",
    board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X",
    board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X",
    board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X",
    board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X",
  ];
  const playerWon = [
    board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O",
    board[2][0] === "O" && board[1][1] === "O" && board[0][2] === "O",
    board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O",
    board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O",
    board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O",
    board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O",
    board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O",
    board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O",
  ];

  if (PCWon.includes(true)) {
    console.log("PC WON");
    return "pcwon";
  }
  if (playerWon.includes(true)) {
    console.log("Player WON");
    return "playerwon";
  }
  return "none";
}
