//import Ship from "./Ship";

import Ship from "./src/ship";

export default class Gameboard {
  constructor(size = 10) {
    this.shots = Array.from(Array(size), () => new Array(size));

    //todo add random locations
    this.ships = {
      Destroyer: { shipObj: new Ship(2), x: 0, y: 0, direction: "horizontal" },
    };
  }
}

Gameboard.prototype.receiveAttack = function (x, y) {
  // NEXT identify if a ship has been hit  <<<<<<<<<<<<--------------------------------------------

  this.shots[x][y] = 1;

  return false;
};

Gameboard.prototype.allSunk = function () {
  return false;
};
