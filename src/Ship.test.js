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

test("coordToSlotNumber horizontal", () => {
  const shipObj = new Ship(5, 0, 0, false);
  expect(shipObj.coordToSlotNumber(4, 0)).toBe(4);
});

test("coordToSlotNumber horizontal", () => {
  const shipObj = new Ship(5, 0, 0, false);
  expect(shipObj.coordToSlotNumber(5, 0)).toBe(null);
});

test("coordToSlotNumber verticle", () => {
  const shipObj = new Ship(5, 0, 0, true);
  expect(shipObj.coordToSlotNumber(0, 4)).toBe(4);
});

test("coordToSlotNumber horizontal", () => {
  const shipObj = new Ship(2, 1, 1, false);
  expect(shipObj.coordToSlotNumber(0, 0)).toBe(null);
});

test("coordToSlotNumber horizontal", () => {
  const shipObj = new Ship(2, 1, 1, false);
  expect(shipObj.coordToSlotNumber(1, 0)).toBe(null);
});

test("coordToSlotNumber horizontal", () => {
  const shipObj = new Ship(2, 1, 1, false);
  expect(shipObj.coordToSlotNumber(2, 0)).toBe(null);
});

test("coordToSlotNumber horizontal 0", () => {
  const shipObj = new Ship(2, 0, 0, false);
  expect(shipObj.coordToSlotNumber(0, 0)).toBe(0);
});

test("coordToSlotNumber horizontal 0 again", () => {
  const shipObj = new Ship(2, 0, 0, false);
  expect(shipObj.coordToSlotNumber(0, 0)).toBe(0);
});
