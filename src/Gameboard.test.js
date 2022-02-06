// see documentaion at
// https://jestjs.io/docs/getting-started

import Gameboard from "./Gameboard";

test("test place ship and isShip function", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(5, 1, 1, false);
  grid.placeShip(2, 7, 0, false);

  expect(grid.isShip(7, 0)).toBe(true);
});

test("test place ship vertical", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(5, 1, 1, true);

  expect(grid.isShip(1, 2)).toBe(true);
});

test("test place ship vertical at top of board", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(2, 9, 8, true);

  expect(grid.isShip(9, 9)).toBe(true);
});

test("test hit ship function", () => {
  const size = 2;
  const grid = new Gameboard(size);
  grid.hitShip(0, 0);
  grid.hitShip(1, 0);
  expect(grid.allSunk()).toBe(true);
});

test("isShip function", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(2, 1, 1, false);
  expect(grid.isShip(1, 2)).toBe(false);
});

test("check collision 1", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(5, 1, 1, false);
  expect(grid.collision(5, 0, 0, true)).toBe(false);
});

test("check collision 2", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(5, 1, 1, 0);
  expect(grid.collision(5, 0, 1, false)).toBe(true);
});

test("valid placement", () => {
  const size = 10;
  const grid = new Gameboard(size);
  expect(grid.validPlacement(5, 0, 0, false)).toBe(true);
});

test("invalid placement horizontal", () => {
  const size = 10;
  const grid = new Gameboard(size);
  expect(grid.validPlacement(2, 9, 0, false)).toBe(false);
});

test("invalid placement vertical", () => {
  const size = 10;
  const grid = new Gameboard(size);
  expect(grid.validPlacement(2, 0, 9, true)).toBe(false);
});

test("invalid placement vertical", () => {
  const size = 10;
  const grid = new Gameboard(size);
  expect(grid.validPlacement(2, -1, 0, false)).toBe(false);
});

test("test that hitting every spot sinks all ships", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.setBoardRandom();
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      grid.receiveAttack(x, y);
    }
  }
  expect(grid.allSunk()).toBe(true);
});
