import Gameboard from "./Gameboard";

export default class Player {
  constructor(isAi = true) {
    this.gameboard = new Gameboard();
    this.isAi = isAi;
    this.setupBoard();
    this.playersTurn = false;
  }
}

Player.prototype.setupBoard = function () {
  if (this.isAi) {
    //this.gameboard.setBoardRandom();
  } else {
    //this.setupUserBoard();
  }
};

Player.prototype.setupUserBoard = function () {
  // calls to UI to setup board
};

Player.prototype.takeTurn = function (opponentGameboard, x = null, y = null) {
  if (x === null || y === null) {
    [x, y] = this.getAiPlay();
  }
  console.log("take turn [" + x + "," + y + "]");
  console.log(opponentGameboard);
  return opponentGameboard.receiveAttack(x, y);
};

Player.prototype.getAiPlay = function () {
  const x = 0;
  const y = 0;
  return [x, y];
};
