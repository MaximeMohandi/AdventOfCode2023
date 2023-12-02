export type Hands = {
  red?: number;
  blue?: number;
  green?: number;
};
export type GameResults = {
  gameId: number;
  handsPlayed: Hands[];
};

export function readGameResult(gameResult: string[]): Array<GameResults> {
  return gameResult.map((game) => {
    const gameId = game.split(":")[0].match(/\d/g).join("");
    const results = game
      .split(":")[1]
      .split(";")
      .map((result) => {
        let hands: Hands = {};
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
      results,
    };
  });
}

export default function validate(
  predicateRedCube: number,
  predicateGreenCube: number,
  predicateBlueCube: number,
  gameResult: string
) {}
