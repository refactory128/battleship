import "core-js";
import "regenerator-runtime/runtime";
import index from "./index.html";
import style from "./style.css";
import Player from "./Player";

async function newBattle() {
  //clear grids
  clearGrids();
  //create player1
  const player1 = new Player();
  //create player2
  const player2 = new Player();
  //generate new grids

  //display("PLACE YOUR FLEET -- select location for Destroyer (5)");
  //renderYourFleet(player1.gameboard);

  // Place your Fleet

  player1.gameboard.setBoardRandom();
  player2.gameboard.setBoardRandom();
  //player2.gameboard.placeShip(2, 0, 0, false);
  //player2.gameboard.placeShip(2, 1, 5, false);

  //enter game loop
  let gameOver = false;
  let x, y;
  let message = "";
  while (!gameOver) {
    clearGrids();
    renderYourFleet(player1.gameboard);
    renderEnemyWaters(player2.gameboard);

    //display("Your Turn -- ATTACK");
    [x, y] = await getLocationClicked(".EnemyGrid");
    console.log("awaited [" + x + "," + y + "]");
    message = player1.takeTurn(player2.gameboard, x, y);
    //console.log("awaited [" + x + "," + y + "]");
    //message = player1.takeTurn(player2.gameboard, 2, 5);
    display(message);
    console.log(message);

    if (player2.gameboard.allSunk()) {
      gameOver = true;
      break;
    }

    // set turn indicator

    // How do I wait for a user to push the fire button? <<-------------

    //player1 turn
    //return info message
    // pause
    //check for winner
    //return info message
    //move to new battle screen
    // pause

    // set turn indicator
    //player 2 turn
    //return info message
    // pause
    //check for winner
    //return info message
    //move to new battle screen
    // paus
  }
  console.log("game over");
}

////////////////////////////////////////////////////////////////////
// Dom Elements
const newBattleButton = document.querySelector(".NewBattleButton");
newBattleButton.addEventListener("click", function () {
  newBattle();
});

//////////////
// clear Grids
function clearGrids() {
  const YourGrid = document.querySelector(".YourGrid");
  while (YourGrid.firstChild) {
    YourGrid.removeChild(YourGrid.firstChild);
  }

  const EnemyGrid = document.querySelector(".EnemyGrid");
  while (EnemyGrid.firstChild) {
    EnemyGrid.removeChild(EnemyGrid.firstChild);
  }
}

///////////////////////
// render Your Fleet

function renderYourFleet(gameboard) {
  const YourGrid = document.querySelector(".YourGrid");
  YourGrid.appendChild(renderGrid(gameboard, false));
}

///////////////////////
// render Enemy Waters

function renderEnemyWaters(gameboard) {
  const EnemyGrid = document.querySelector(".EnemyGrid");
  EnemyGrid.appendChild(renderGrid(gameboard, true));
}

///////////////////////
// render grid

function renderGrid(gameboard, isOpponent) {
  const grid = document.createElement("table");
  const gridHead = grid.createTHead();
  const gridHeadRow = gridHead.insertRow(0);
  for (let i = -1; i < gameboard.size; i++) {
    const gridHeadCell = gridHeadRow.insertCell();

    if (i >= 0) {
      gridHeadCell.innerHTML = i;
    }
  }
  const gridBody = grid.createTBody();

  for (let y = gameboard.size - 1; y >= 0; y--) {
    const currentRow = gridBody.insertRow();
    currentRow.innerHTML = String.fromCharCode(65 + y);
    for (let x = 0; x < gameboard.size; x++) {
      let cell = currentRow.insertCell(x);
      cell.innerHTML = gameboard.shots[x][y];

      if (gameboard.shots[x][y] === 0) {
        cell.classList.add("unknown");
      }

      if (gameboard.shots[x][y] === 1) {
        cell.classList.remove("unknown");
        cell.classList.add("miss");
      }

      if (gameboard.shots[x][y] === 2) {
        cell.classList.remove("unknown");
        cell.classList.add("hit");
      }

      if (
        //!isOpponent &&
        //gameboard.shots[x][y] !== 2 &&
        gameboard.isShip(x, y)
      ) {
        cell.classList.remove("unknown");
        cell.classList.add("ship");
      }

      cell.dataset.x = x;
      cell.dataset.y = y;
    }
  }
  return grid;
}

//////////
//getLocationClicked(".EnemyGrid");

function getLocationClicked(gridClass) {
  return new Promise((resolve) => {
    const grid = document.querySelector(gridClass);
    const cells = grid.querySelectorAll("td");
    for (let cell of cells) {
      cell.addEventListener("click", (el) => {
        console.log(cell.dataset.x);
        resolve([parseInt(cell.dataset.x), parseInt(cell.dataset.y)]);
      });
    }
  });
}

//////////////
// display

function display(message) {
  const info = document.querySelectorAll(".info");
  info.forEach((el) => {
    el.innerHTML = message;
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
