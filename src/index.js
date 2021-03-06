import "core-js";
import "regenerator-runtime/runtime";
import index from "./index.html";
import style from "./style.css";
import Player from "./Player";

async function newBattle() {
  const gameSpeed = 1000;
  let gameOver = false;
  let x, y;
  let message = "";

  //clear grids
  clearGrids();
  //create player1
  const player1 = new Player();
  //create player2
  const player2 = new Player();
  //generate new grids

  //player1.gameboard.setBoardRandom();
  player2.gameboard.setBoardRandom();
  player1.registerOpponentGameboard(player2.gameboard);
  player2.registerOpponentGameboard(player1.gameboard);

  await placeFleet(player1, 5);
  await placeFleet(player1, 4);
  await placeFleet(player1, 3);
  await placeFleet(player1, 3);
  await placeFleet(player1, 2);
  // Place your Fleet
  /*
  player1.gameboard.placeShip(2, 0, 0, true);
  display("PLACE YOUR FLEET -- select location for Destroyer (5)");
  ShowScreen("Your Fleet");
  renderYourFleet(player1.gameboard);
  CreateRotateButton(true);
  [x, y] = await getLocationClicked(".YourGrid");
  player1.gameboard.placeShip(5, x, y, true);

  clearGrids();
  display("PLACE YOUR FLEET -- select location for Battleship (4)");
  ShowScreen("Your Fleet");
  renderYourFleet(player1.gameboard);
  [x, y] = await getLocationClicked(".YourGrid");
  player1.gameboard.placeShip(4, x, y, false);

  clearGrids();
  display("PLACE YOUR FLEET -- select location for Destroyer (3)");
  ShowScreen("Your Fleet");
  renderYourFleet(player1.gameboard);
  [x, y] = await getLocationClicked(".YourGrid");
  player1.gameboard.placeShip(3, x, y, false);

  clearGrids();
  display("PLACE YOUR FLEET -- select location for Submarine (3)");
  ShowScreen("Your Fleet");
  renderYourFleet(player1.gameboard);
  [x, y] = await getLocationClicked(".YourGrid");
  player1.gameboard.placeShip(3, x, y, false);

  clearGrids();
  display("PLACE YOUR FLEET -- select location for Patrol Boat (2)");
  ShowScreen("Your Fleet");
  renderYourFleet(player1.gameboard);
  [x, y] = await getLocationClicked(".YourGrid");
  player1.gameboard.placeShip(2, x, y, false);
*/
  //player2.gameboard.placeShip(2, 0, 0, false);
  //player2.gameboard.placeShip(2, 1, 5, false);

  //enter game loop

  display("PREPARE FOR BATTLE!");
  while (!gameOver) {
    //Player 1 Turn
    //Reset GameBoard
    clearGrids();
    renderYourFleet(player1.gameboard);
    renderEnemyWaters(player2.gameboard);

    //Pause to alow info messages to display
    await sleep(gameSpeed);
    display("Your Turn -- ATTACK!");
    ShowScreen("Enemy Waters");
    //Get Next Attack Location
    [x, y] = await getLocationClicked(".EnemyGrid");

    //Process Attack
    message = player1.takeTurn(x, y);

    //display Result of Attack
    display("YOUR ATTACK: " + message);

    //Check for winner
    if (player2.gameboard.allSunk()) {
      gameOver = true;
      display("YOU WIN! -- GAME OVER");
      break;
    }

    //Player 2 Turn
    //Reset GameBoard
    clearGrids();
    renderYourFleet(player1.gameboard);
    renderEnemyWaters(player2.gameboard);

    //Pause to alow info messages to display
    await sleep(gameSpeed);
    ShowScreen("Your Fleet");
    display("RED ALERT -- INCOMING ENEMY FIRE");
    await sleep(gameSpeed);
    //Get Next Attack Location
    //[x, y] = await getLocationClicked(".EnemyGrid");

    x = null;
    y = null;
    [x, y] = player2.getAiPlay();
    console.log("AI play [" + x + "," + y + "]");
    //Process Attack
    message = player2.takeTurn(x, y);

    //display Result of Attack
    display("ENEMY ATTACK: " + message);

    //Check for winner
    if (player1.gameboard.allSunk()) {
      gameOver = true;
      display("GAME OVER -- OPPONENT WINS");
      break;
    }
  }
  console.log("game over");

  clearGrids();
  renderYourFleet(player1.gameboard);
  renderEnemyWaters(player2.gameboard);
  ShowScreen("Info");
}

//////////
// Place Fleet

async function placeFleet(player, shipSize) {
  // Place your Fleet

  let x, y;
  let i = 0;
  let validPlacement;
  let isVertical;

  do {
    clearGrids();
    validPlacement = false;
    isVertical = true;
    if (i > 0) {
      display("INVALID PLACEMENT -- select location for ship size " + shipSize);
    } else {
      display("PLACE YOUR FLEET -- select location for ship size " + shipSize);
    }
    ShowScreen("Your Fleet");
    renderYourFleet(player.gameboard);
    CreateRotateButton(true);
    [x, y] = await getLocationClicked(".YourGrid");
    isVertical = getPlacementDirection();
    //console.log(isVertical);
    validPlacement = player.gameboard.placeShip(shipSize, x, y, isVertical);
    i++;
  } while (!validPlacement && i < 500);
}

////////////////////////////////////////////////////////////////////
// Dom Elements
const newBattleButton = document.querySelector(".NewBattleButton");
newBattleButton.addEventListener("click", function () {
  newBattle();
});

const ContinueButton = document.querySelector(".ContinueButton");
ContinueButton.addEventListener("click", function () {
  ShowScreen("New Battle");
});

ShowScreen("New Battle");

//////////////
// Move to Screen
function ShowScreen(screen) {
  const NewBattleModal = document.querySelector("#NewBattleModal");
  NewBattleModal.style.display = "none";
  const InfoModal = document.querySelector("#InfoModal");
  InfoModal.style.display = "none";

  if (screen === "New Battle") {
    NewBattleModal.style.display = "flex";
    document.querySelector(".NewBattleScreen").scrollIntoView();
  } else if (screen === "Your Fleet") {
    document.querySelector(".YourFleetScreen").scrollIntoView();
  } else if (screen === "Enemy Waters") {
    document.querySelector(".EnemyWatersScreen").scrollIntoView();
  } else if (screen === "Info") {
    InfoModal.style.display = "flex";
  }
}

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

/////////////////
//
function CreateRotateButton(isVertical) {
  const rotateButton = document.createElement("button");
  rotateButton.innerHTML = isVertical ? "PLACE VERTICAL" : "PLACE HORIZONTAL";
  rotateButton.classList.add("rotateButton");
  rotateButton.dataset.isVertical = isVertical;

  // Next Add Event listener for Rotatate button <<-------------
  rotateButton.addEventListener("click", (el) => {
    if (rotateButton.dataset.isVertical === "true") {
      rotateButton.dataset.isVertical = "false";
      rotateButton.innerHTML = "PLACE HORIZONTAL";
    } else {
      rotateButton.dataset.isVertical = "true";
      rotateButton.innerHTML = "PLACE VERTICAL";
    }
  });

  const YourGrid = document.querySelector(".YourGrid");
  YourGrid.appendChild(rotateButton);
}

//////////
// getPlacementDirection();

function getPlacementDirection() {
  const isVertical =
    document.querySelector(".rotateButton").dataset.isVertical === "true";
  console.log("placement is Vertical =" + isVertical);
  return isVertical;
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
  const grid = document.createElement("div");
  grid.classList.add("grid");

  for (let y = gameboard.size - 1; y >= 0; y--) {
    const currentRow = document.createElement("div");
    currentRow.classList.add("row");

    grid.appendChild(currentRow);

    for (let x = 0; x < gameboard.size; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      currentRow.appendChild(cell);

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

      // to show opponents ships remove !isOpponent
      if (
        !isOpponent &&
        gameboard.shots[x][y] !== 2 &&
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
    const cells = grid.querySelectorAll(".cell");
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
