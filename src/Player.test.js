import Player from "./Player";
import Gameboard from "./Gameboard";

test("test player 1", () => {
  const player1 = new Player();
  const player2 = new Player();
  player1.registerOpponentGameboard(player2.gameboard);
  expect(player1.takeTurn(0, 0)).toBe("Miss");
});

test("test player 2", () => {
  const player1 = new Player();
  const player2 = new Player();
  player1.registerOpponentGameboard(player2.gameboard);
  player2.gameboard.placeShip(2, 0, 0, false);
  player2.gameboard.placeShip(2, 1, 5, false);
  expect(player1.takeTurn(2, 5)).toBe("Hit");
});
