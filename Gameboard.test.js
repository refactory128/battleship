// see documentaion at
// https://jestjs.io/docs/getting-started

import Gameboard from "./Gameboard";

test("test that a new game board is not all sunk", () => {
  const grid = new Gameboard();
  expect(grid.allSunk()).toBe(false);
});

test("test that hitting every spot sinks all ships", () => {
  const size = 10;
  const grid = new Gameboard(size);
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      grid.receiveAttack[(x, y)];
    }
  }
  expect(grid.allSunk()).toBe(true);
});
