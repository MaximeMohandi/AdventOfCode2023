import { readFileSync } from "fs";
const path = require("path");

export type SetOfCube = {
  red?: number;
  blue?: number;
  green?: number;
};
export type GameResults = {
  gameId: number;
  setOfCubes: SetOfCube[];
};

export function readGameResult(gameResult: string[]): Array<GameResults> {
  return gameResult.map((game) => {
    const gameId = game.split(":")[0].match(/\d/g).join("");
    const setOfCubes = game
      .split(":")[1]
      .split(";")
      .map((result) => {
        let hands: SetOfCube = {};
        result.split(",").forEach((cubes) => {
          let trimmedNumber = cubes.trim();
          let nbCube = trimmedNumber.split(" ")[0];
          let colorCube = trimmedNumber.split(" ")[1];
          if (cubes.includes(colorCube))
            hands = {
              ...hands,
              [colorCube]: parseInt(nbCube),
            };
        });
        return hands;
      });
    return {
      gameId: parseInt(gameId),
      setOfCubes,
    };
  });
}

export function isGamePossible(
  bagPredicate: SetOfCube,
  gameResult: GameResults
): boolean {
  let isPossible = true;
  gameResult.setOfCubes.forEach((hand) => {
    Object.keys(hand).forEach((color) => {
      if (hand[color] > bagPredicate[color]) {
        isPossible = false;
      }
    });
  });
  return isPossible;
}

export const sumPossibleGameIds = (
  bagPredicate: SetOfCube,
  games: string[]
) => {
  const gamesResults = readGameResult(games);
  let nbGamePossible = 0;
  gamesResults.forEach((game) => {
    if (isGamePossible(bagPredicate, game)) {
      nbGamePossible += game.gameId;
    }
  });
  return nbGamePossible;
};

export const findFewestCubeForGame = (game: GameResults) => {
  return {
    red: Math.max(...game.setOfCubes.map((hand) => hand.red ?? 0)),
    blue: Math.max(...game.setOfCubes.map((hand) => hand.blue ?? 0)),
    green: Math.max(...game.setOfCubes.map((hand) => hand.green ?? 0)),
  };
};

export const computeCubesPower = (cubes: SetOfCube) => {
  return Object.values(cubes).reduce(
    (acc, curr) => (acc == 0 ? 1 : acc) * (curr == 0 ? 1 : curr),
    1
  );
};

export const computeMinimumSetOfCubesPower = (games: GameResults) => {
  const minimmumSet = findFewestCubeForGame(games);
  return computeCubesPower(minimmumSet);
};

export const sumMinimumSetOfCubesPower = (games: string[]) => {
  const gamesResults = readGameResult(games);
  let sum = 0;
  gamesResults.forEach((game) => {
    sum += computeMinimumSetOfCubesPower(game);
  });
  return sum;
};

export default function validate() {
  const validationFile = readFileSync(
    path.join(__dirname, "./validation.txt"),
    "utf-8"
  );
  let games: string[] = validationFile.split("\r\n");
  return `part 1: ${sumPossibleGameIds(
    { red: 12, green: 13, blue: 14 },
    games
  )} part 2: ${sumMinimumSetOfCubesPower(games)}`;
}
