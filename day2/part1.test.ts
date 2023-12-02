import { isGamePossible, readGameResult, sumPossibleGameIds } from ".";
import { gameResults, gameResultsLines } from "./validationFixture";

test("should read game result", () => {
  const result = readGameResult(gameResultsLines);

  expect(result).toEqual(gameResults);
});

test("when game has more cube than predicate than game is not possible", () => {
  const bagPredicate = { red: 12, green: 13, blue: 14 };
  const gameResults = {
    gameId: 3,
    setOfCubes: [
      { green: 8, blue: 6, red: 20 },
      { blue: 5, red: 4, green: 13 },
      { green: 5, red: 1 },
    ],
  };
  const result = isGamePossible(bagPredicate, gameResults);

  expect(result).toBe(false);
});

test("should sum all possible game id", () => {
  const bagPredicate = { red: 12, green: 13, blue: 14 };

  const result = sumPossibleGameIds(bagPredicate, gameResultsLines);

  expect(result).toBe(8);
});
