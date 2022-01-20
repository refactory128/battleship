export default class Ship {
  constructor(length = 2) {
    this.length = length;
    this.hits = new Array(length).fill(0);
  }
}

Ship.prototype.hit = function (number) {
  this.hits[number] = 1;
};

Ship.prototype.isSunk = function () {
  return this.hits.reduce((a, b) => a + b, 0) >= this.length;
};
