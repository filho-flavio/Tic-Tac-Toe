// Get HTML elements with DOM
let tds = document.querySelectorAll("td");
const btStart = document.getElementById("btStart");
const outDisplay = document.getElementById("outDisplay");

// Declares an array to track the state of the game
let arr = Array(9).fill("");

// Variables to control players
let currentPlayer = "";
let gameActive = false;

// Add a click event to the "btStart" button
btStart.addEventListener("click", () => {
  const playerOne = prompt("Digite o nome do primeiro jogador: ");
  const playerTwo = prompt("Digite o nome do segundo jogador: ");

  if (playerOne !== "" && playerTwo !== "") {
    startGame(playerOne, playerTwo);
  } else {
    alert("Por favor, insira um nome para ambos os jogadores.");
  }
});

function startGame(playerOne, playerTwo) {
  clearBoard();
  btStart.style.display = "none";
  currentPlayer = playerOne;
  gameActive = true;
  outDisplay.textContent = `Jogada do(a) ${currentPlayer}`;

  // Add click events to table cells
  tds.forEach((td, index) => {
    td.addEventListener("click", () => {
      if (gameActive && td.textContent === "") {
        td.textContent = currentPlayer;
        arr[index] = currentPlayer;

        if (checkWin(currentPlayer)) {
          outDisplay.textContent = `${currentPlayer} venceu!`;
          gameActive = false;
          btStart.style.display = "";
        } else if (!arr.includes("")) {
          outDisplay.textContent = "Empate!";
          gameActive = false;
          btStart.style.display = "";
        } else {
          currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
          outDisplay.textContent = `Jogada do(a) ${currentPlayer}`;
        }
      }
    });
  });
}

function checkWin(player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (arr[a] === player && arr[b] === player && arr[c] === player) {
      return true;
    }
  }
  return false;
}

function clearBoard() {
  tds.forEach((td) => {
    td.textContent = "";
  });

  // Reset the array that stores the game state
  arr = Array(9).fill("");
}
