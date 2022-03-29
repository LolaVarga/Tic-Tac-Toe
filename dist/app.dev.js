"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var mark_x = "x";
var mark_o = "o";
var circleTurn;
var cellElements = document.querySelectorAll(".grid-cell");
var winnerIs = document.querySelector(".message");
var inputValue = document.querySelector('.form__input');
var btn = document.querySelector('.message__form--btn');
var winner = document.querySelector('.winner');
var moves = document.querySelector('.moves');
var arraySidebar = document.querySelector(".sidebar");
var playersSidebar = document.querySelector(".sidebar__players");
var winners = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var numberOfMoves = 0;
start();

btn.onclick = function () {
  if (inputValue.value == "") {
    alert("Name must be filled out");
  } else {
    var key = inputValue.value;
    addWinner();
    winnerIs.classList.add("hidden");
    start();
  }
};

function getWinners() {
  var retrievedObject = localStorage.getItem('winners');
  return JSON.parse(retrievedObject) || [];
}

function addWinner(name, moves, winnerSymbol) {
  var arr = getWinners();
  var sidebar = {
    name: inputValue.value,
    moves: numberOfMoves,
    symbol: circleTurn ? "O" : "X"
  };

  if (!arr.includes(sidebar)) {
    arr.push(sidebar);
  }

  localStorage.setItem("winners", JSON.stringify(arr));
}

function initSidebar() {
  playersSidebar.innerHTML = '';
  getWinners().forEach(function (item) {
    var para = document.createElement("p");
    para.className = 'para';
    var node = document.createTextNode(" Name: " + item.name + " Moves: " + item.moves + " Symbol: " + item.symbol);
    para.appendChild(node);
    playersSidebar.appendChild(para);
  });
}

function start() {
  circleTurn = false;
  numberOfMoves = 0;
  document.querySelector('.message').classList.add('hidden');
  cellElements.forEach(function (cell) {
    cell.addEventListener("click", handleClick, {
      once: true
    });
  });
  winnerIs.classList.remove('show');
  initSidebar();
}

function handleClick(e) {
  var cell = e.target;
  var turn = circleTurn ? mark_o : mark_x;
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
    winnerIs.innerText = "Draw!";
  } else {
    winnerIs.classList.add('hidden');
    moves.innerText = "Moves:".concat(numberOfMoves);
    winner.classList.add('winner');
    winner.innerText = "Winner:".concat(circleTurn ? "O" : "X");
  }

  winnerIs.classList.add('show');
  winnerIs.classList.remove('hidden');
}

function isDraw() {
  return _toConsumableArray(cellElements).every(function (cell) {
    return cell.classList.contains(mark_x) || cell.classList.contains(mark_o);
  });
}

function win(turn) {
  return winners.some(function (combination) {
    return combination.every(function (index) {
      return cellElements[index].classList.contains(turn);
    });
  });
}