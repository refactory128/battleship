import Gameboard from "./Gameboard";

export default class Player {
  constructor(isAi = true) {
    this.gameboard = new Gameboard();
    this.isAi = isAi;
    this.setupBoard();
    this.playersTurn = false;
    this.opponentGameboard = null;
  }
}

Player.prototype.registerOpponentGameboard = function (opponentGameboard) {
  this.opponentGameboard = opponentGameboard;
};

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

Player.prototype.takeTurn = function (x = null, y = null) {
  if (x === null || y === null) {
    [x, y] = this.getAiPlay(this.opponentGameboard);
  }
  //console.log("take turn [" + x + "," + y + "]");
  //console.log(opponentGameboard);
  return this.opponentGameboard.receiveAttack(x, y);
};

Player.prototype.getAiPlay = function () {
  let i = 1;
  let x = 0;
  let y = 0;
  do {
    x = Math.floor(Math.random() * this.opponentGameboard.size);
    y = Math.floor(Math.random() * this.opponentGameboard.size);
    i++;
  } while (this.opponentGameboard.shots[x][y] !== 0 && i < 500);

  return [x, y];
};
