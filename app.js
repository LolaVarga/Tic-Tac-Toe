const mark_x = "x";
const mark_o = "o";

let circleTurn;
const cellElements = document.querySelectorAll(".grid-cell");
const winnerIs = document.querySelector(".message");
const inputValue = document.querySelector('.form__input');
const btn = document.querySelector('.message__form--btn');
const winner = document.querySelector('.winner');
const moves = document.querySelector('.moves');
const arraySidebar = document.querySelector(".sidebar");
const playersSidebar = document.querySelector(".sidebar__players");

var winners = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let numberOfMoves = 0;

start();

btn.onclick = function () {
  if (inputValue.value == "") {
    alert("Name must be filled out");
  } else {
    const key = inputValue.value;
    addWinner();
    winnerIs.classList.add("hidden");
    start();
  }
}

function getWinners() {
  let retrievedObject = localStorage.getItem('winners');
  return JSON.parse(retrievedObject) || [];
}

function addWinner(name, moves, winnerSymbol) {
  let arr = getWinners();
  var sidebar = {
    name: inputValue.value,
    moves: numberOfMoves,
    symbol: circleTurn ? "O" : "X"
  }
  if (!arr.includes(sidebar)) {
    arr.push(sidebar);
  }
  localStorage.setItem("winners", JSON.stringify(arr));
}


function initSidebar() {
  playersSidebar.innerHTML = '';
  getWinners().forEach(item => {
    const para = document.createElement("p");
    para.className = 'para';
    const node = document.createTextNode(" Name: " + item.name + " Moves: " + item.moves + " Symbol: " + item
      .symbol);
    para.appendChild(node);
    playersSidebar.appendChild(para);
  })


}

function start() {
  circleTurn = false;
  numberOfMoves = 0;
  document.querySelector('.message').classList.add('hidden');
  cellElements.forEach(cell => {
    cell.addEventListener("click", handleClick, {
      once: true
    });
  });
  winnerIs.classList.remove('show');

  initSidebar();
}

function handleClick(e) {
  const cell = e.target;
  const turn = circleTurn ? mark_o : mark_x;
  placeMark(cell, turn);
  if (win(turn)) {
    end(false);
  } else if (isDraw && numberOfMoves === 9) {
    end(true);
  } else {
    swap();
  }
}

function placeMark(cell, turn) {
  cell.classList.add(turn);
  numberOfMoves += 1;
}

function swap() {
  circleTurn = !circleTurn;
}

function end(draw) {
  if (draw) {
    winnerIs.innerText = "Draw!"
  } else {
    winnerIs.classList.add('hidden');
    moves.innerText = `Moves:${numberOfMoves}`;
    winner.classList.add('winner');
    winner.innerText = `Winner:${circleTurn ? "O" : "X"}`
  }
  winnerIs.classList.add('show');
  winnerIs.classList.remove('hidden');

}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(mark_x) || cell.classList.contains(mark_o);
  })
}



function win(turn) {
  return winners.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(turn);
    })
  })
}
