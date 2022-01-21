// see documentaion at
// https://jestjs.io/docs/getting-started

import Gameboard from "./Gameboard";

test("test place ship and isShip function", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(5, 1, 1, 0);

  expect(grid.isShip(5, 1)).toBe(true);
});

test("check collision 1", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(5, 1, 1, 0);
  expect(grid.collision(5, 0, 0, 1)).toBe(false);
});

test("check collision 2", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(5, 1, 1, 0);
  expect(grid.collision(5, 0, 1, 0)).toBe(true);
});

test("test hit ship function", () => {
  const size = 2;
  const grid = new Gameboard(size);
  grid.hitShip(0, 0);
  grid.hitShip(1, 0);
  expect(grid.allSunk()).toBe(true);
});

test("test that hitting every spot sinks all ships", () => {
  const size = 10;
  const grid = new Gameboard(size);
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      grid.receiveAttack(x, y);
    }
  }
  expect(grid.allSunk()).toBe(true);
});

test("isShip function", () => {
  const size = 10;
  const grid = new Gameboard(size);
  grid.placeShip(2, 1, 1, 0);
  expect(grid.isShip(1, 2)).toBe(false);
});
