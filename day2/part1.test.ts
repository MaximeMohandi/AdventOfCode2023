import { isGamePossible, readGameResult, sumPossibleGameIds } from ".";

test("should read game result", () => {
  const expected = [
    {
      gameId: 1,
      handsPlayed: [
        { blue: 3, red: 4 },
        { red: 1, green: 2, blue: 6 },
        { green: 2 },
      ],
    },
    {
      gameId: 2,
      handsPlayed: [
        { blue: 1, green: 2 },
        { red: 1, green: 3, blue: 4 },
        { green: 1, blue: 1 },
      ],
    },
    {
      gameId: 3,
      handsPlayed: [
        { green: 8, blue: 6, red: 20 },
        { blue: 5, red: 4, green: 13 },
        { green: 5, red: 1 },
      ],
    },
    {
      gameId: 4,
      handsPlayed: [
        { green: 1, red: 3, blue: 6 },
        { green: 3, red: 6 },
        { green: 3, blue: 15, red: 14 },
      ],
    },
    {
      gameId: 5,
      handsPlayed: [
        { red: 6, blue: 1, green: 3 },
        { blue: 2, red: 1, green: 2 },
      ],
    },
  ];

  const result = readGameResult([
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  ]);

  expect(result).toEqual(expected);
});

test("when game has more cube than predicate than game is not possible", () => {
  const bagPredicate = { red: 12, green: 13, blue: 14 };
  const gameResults = {
    gameId: 3,
    handsPlayed: [
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
  const gameResults = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  ];

  const result = sumPossibleGameIds(bagPredicate, gameResults);

  expect(result).toBe(8);
});
