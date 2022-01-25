//import Ship from "./Ship";

import Ship from "./Ship";

export default class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.shots = Array.from(Array(size), () => new Array(size).fill(0));

    //todo add random locations
    this.ships = new Array();
  }
}

Gameboard.prototype.setBoardRandom = function () {
  this.placeRandom(5); //Carrier
  this.placeRandom(4); //Battleship
  this.placeRandom(3); //Cruser
  this.placeRandom(3); //Submarine
  this.placeRandom(2); //Destroyer
};

Gameboard.prototype.placeRandom = function (length) {
  let i = 0;
  let x;
  let y;
  let isVertical;
  do {
    x = Math.floor(Math.random() * this.size);
    y = Math.floor(Math.random() * this.size);
    isVertical = Math.floor(Math.random() * 2) === 0;
    i++;
  } while (!this.placeShip(length, x, y, isVertical) && i < 500);

  if (i >= 500) throw new Error(`hit max trys`);
};

Gameboard.prototype.placeShip = function (length, x, y, isVertical) {
  if (
    !this.collision(length, x, y, isVertical) &&
    this.validPlacement(length, x, y, isVertical && length > 1 && length < 6)
  ) {
    this.ships.push(new Ship(length, x, y, isVertical));
    return true;
  }
  return false;
};

Gameboard.prototype.validPlacement = function (length, x, y, isVertical) {
  if (
    x >= 0 &&
    x < this.size &&
    y >= 0 &&
    y < this.size &&
    ((isVertical && length + y < this.size) ||
      (!isVertical && length + x < this.size))
  ) {
    return true;
  }

  return false;
};

Gameboard.prototype.collision = function (length, x, y, isVertical) {
  for (let i = 0; i < length; i++) {
    if (isVertical) {
      if (this.isShip(x, y + i)) return true;
    } else {
      if (this.isShip(x + i, y)) return true;
    }
  }
  return false;
};

Gameboard.prototype.receiveAttack = function (x, y) {
  console.log("recieveAttack [" + x + "," + y + "]");
  console.log(this.ships);
  console.log(this.isShip(x, y));

  if (this.isShip(x, y)) {
    this.shots[x][y] = 2; // hit
    this.hitShip(x, y);
    return "Hit";
  } else {
    this.shots[x][y] = 1; // miss
    console.log("miss");
    return "Miss";
  }
};

Gameboard.prototype.allSunk = function () {
  let noBoatsLeft = true;
  for (let boat of this.ships) {
    if (!boat.isSunk()) {
      noBoatsLeft = false;
    }
  }
  return noBoatsLeft;
};

Gameboard.prototype.isShip = function (x, y) {
  for (let boat of this.ships) {
    //console.log(boat);
    const slot = boat.coordToSlotNumber(x, y);
    //console.log(slot);
    if (slot !== null) {
      return true;
    }
  }
  return false;
};

Gameboard.prototype.hitShip = function (x, y) {
  for (let boat of this.ships) {
    const slot = boat.coordToSlotNumber(x, y);
    if (slot !== null) {
      boat.hit(slot);
      console.log("hit slot = " + slot);
      return true;
    }
  }
};
