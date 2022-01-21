export default class Ship {
  constructor(length = 2, x = 0, y = 0, isVertical = false) {
    this.length = length;
    this.hits = new Array(length).fill(0);
    this.x = x;
    this.y = y;
    this.isVertical = isVertical;
  }
}

Ship.prototype.hit = function (number) {
  this.hits[number] = 1;
};

Ship.prototype.isSunk = function () {
  return this.hits.reduce((a, b) => a + b, 0) >= this.length;
};

Ship.prototype.coordToSlotNumber = function (x, y) {
  if (this.isVertical === true) {
    if (y >= this.y && y < this.y + this.length && x === this.x) {
      return y - this.y;
    }
  } else {
    // horizontal
    if (x >= this.x && x < this.x + this.length && y === this.y) {
      return x - this.x;
    }
  }
  return null;
};
