import { readGameResult } from ".";

test("should read game result", () => {
  const expected = [
    {
      gameId: 11,
      results: [
        { blue: 3, red: 4 },
        { red: 1, green: 2, blue: 6 },
        { green: 2 },
      ],
    },
    {
      gameId: 2,
      results: [
        { blue: 1, green: 2 },
        { red: 1, green: 3, blue: 4 },
        { green: 1, blue: 1 },
      ],
    },
  ];

  const result = readGameResult([
    "Game 11: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  ]);

  expect(result).toEqual(expected);
});

// test("when game has more red cube than predicate then game is not possible", () => {
//   const result = validate(12, 13, 14);

//   expect(result).toBe(0);
// });
