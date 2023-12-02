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

export default function validate(bagPredicate: Hand, gameResult: string) {}
