// see documentaion at
// https://jestjs.io/docs/getting-started

import Ship from "./Ship";

test("test that a new ship is not sunk", () => {
  const shipObj = new Ship(5);
  expect(shipObj.isSunk()).toBe(false);
});

test("test that a ship of size 2 is sunk after 2 hits", () => {
  const shipObj = new Ship(2);
  shipObj.hit(0);
  shipObj.hit(1);
  expect(shipObj.isSunk()).toBe(true);
});

test("test that a ship of size 2 is not sunk after 2 identical hits", () => {
  const shipObj = new Ship(2);
  shipObj.hit(0);
  shipObj.hit(0);
  expect(shipObj.isSunk()).toBe(false);
});
