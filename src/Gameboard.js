//import Ship from "./Ship";

import Ship from "./Ship";

export default class Gameboard {
  constructor(size = 10) {
    this.shots = Array.from(Array(size), () => new Array(size));

    //todo add random locations
    this.ships = new Array();
  }
}

Gameboard.prototype.placeShip = function (length, x, y, isVertical) {
  this.ships.push(new Ship(length, x, y, isVertical));
};

Gameboard.prototype.collision = function (length, x, y, isVertical) {
  for (let i = 0; i < length; i++) {
    if (isVertical) {
      if (this.isShip(x, y + i)) return true;
    } else {
      console.log(i);
      console.log(this.isShip(x + i, y));
      if (this.isShip(x + i, y)) return true;
    }
  }
  return false;
};

Gameboard.prototype.receiveAttack = function (x, y) {
  if (this.isShip(x, y)) {
    this.shots[x][y] = 2; // hit
    this.hitShip(x, y);
  } else {
    this.shots[x][y] = 1; // miss
  }

  return false;
};

Gameboard.prototype.allSunk = function () {
  let noBoatsLeft = true;
  for (const boat of this.ships) {
    if (!boat.isSunk()) {
      noBoatsLeft = false;
    }
  }
  return noBoatsLeft;
};

Gameboard.prototype.isShip = function (x, y) {
  for (const boat of this.ships) {
    const slot = boat.coordToSlotNumber(x, y);

    if (slot !== null) {
      return true;
    }
  }
  return false;
};

Gameboard.prototype.hitShip = function (x, y) {
  for (const boat of this.ships) {
    const slot = boat.coordToSlotNumber(x, y);
    if (slot !== null) {
      boat.hit(slot);
    } else {
      throw new Error(`No Ship at this location to hit`);
    }
  }
};
