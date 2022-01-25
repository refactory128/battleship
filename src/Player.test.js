import Player from "./Player";
import Gameboard from "./Gameboard";

test("test player", () => {
  const player1 = new Player();
  expect(player1.takeTurn(new Gameboard(), 0, 0)).toBe("Miss");
});

test("test player", () => {
  const player1 = new Player();
  const player2 = new Player();
  player2.gameboard.placeShip(2, 0, 0, false);
  player2.gameboard.placeShip(2, 1, 5, false);
  expect(player1.takeTurn(player2.gameboard, 2, 5)).toBe("Hit");
});
