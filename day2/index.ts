import { readFileSync } from "fs";
const path = require("path");

export type Hand = {
  red?: number;
  blue?: number;
  green?: number;
};
export type GameResults = {
  gameId: number;
  handsPlayed: Hand[];
};

export function readGameResult(gameResult: string[]): Array<GameResults> {
  return gameResult.map((game) => {
    const gameId = game.split(":")[0].match(/\d/g).join("");
    const handsPlayed = game
      .split(":")[1]
      .split(";")
      .map((result) => {
        let hands: Hand = {};
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
      handsPlayed,
    };
  });
}

export function isGamePossible(
  bagPredicate: Hand,
  gameResult: GameResults
): boolean {
  let isPossible = true;
  gameResult.handsPlayed.forEach((hand) => {
    Object.keys(hand).forEach((color) => {
      if (hand[color] > bagPredicate[color]) {
        isPossible = false;
      }
    });
  });
  return isPossible;
}

export const sumPossibleGameIds = (bagPredicate: Hand, games: string[]) => {
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
    red: Math.max(...game.handsPlayed.map((hand) => hand.red ?? 0)),
    blue: Math.max(...game.handsPlayed.map((hand) => hand.blue ?? 0)),
    green: Math.max(...game.handsPlayed.map((hand) => hand.green ?? 0)),
  };
};

export const computeCubesPower = (cubes: Hand) => {
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
