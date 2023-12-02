import { findFewestCubeForGame } from ".";

test("should find the fewest number of cubes possible in a game", () => {
  const game = {
    gameId: 1,
    handsPlayed: [
      { red: 1, blue: 1, green: 1 },
      { red: 2, blue: 2, green: 2 },
      { red: 3, blue: 3, green: 3 },
    ],
  };

  const expected = { red: 3, blue: 3, green: 3 };

  expect(findFewestCubeForGame(game)).toEqual(expected);
});
