import {
  computeCubesPower,
  computeMinimumSetOfCubesPower,
  findFewestCubeForGame,
  sumMinimumSetOfCubesPower,
} from ".";
import { gameResultsLines } from "./validationFixture";

test("should find the fewest number of cubes possible in a game", () => {
  const game = {
    gameId: 1,
    setOfCubes: [
      { red: 1, blue: 3, green: 1 },
      { red: 3, blue: 2, green: 2 },
      { red: 2, blue: 1, green: 3 },
    ],
  };

  const expected = { red: 3, blue: 3, green: 3 };

  expect(findFewestCubeForGame(game)).toEqual(expected);
});

test("should compute the power of a set of cubes", () => {
  const cubes = { red: 3, blue: 3, green: 3 };

  expect(computeCubesPower(cubes)).toEqual(27);
});

test("when no cube of a color is present, the power is 1", () => {
  const cubes = { red: 0, blue: 3, green: 3 };

  expect(computeCubesPower(cubes)).toEqual(9);
});

test("should compute game's minimum set of cubes power", () => {
  const games = {
    gameId: 1,
    setOfCubes: [
      { blue: 3, red: 4 },
      { red: 1, green: 2, blue: 6 },
      { green: 2 },
    ],
  };

  const result = computeMinimumSetOfCubesPower(games);

  expect(result).toEqual(48);
});

test("shoul sum games' minimum set of cubes power", () => {
  const result = sumMinimumSetOfCubesPower(gameResultsLines);

  expect(result).toEqual(2286);
});
