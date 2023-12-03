import { readFileSync } from "fs";
const path = require("path");
const IS_SPECIAL_CHAR_EXCEPT_DOT = /[^\w\s.]/;

export const hasSymbolLeft = (input: string, number: string) => {
  let index = input.indexOf(number);
  return IS_SPECIAL_CHAR_EXCEPT_DOT.test(input[index - 1]);
};

export const hasSymbolRight = (input: string, number: string) => {
  let index = input.indexOf(number) + number.length;
  return IS_SPECIAL_CHAR_EXCEPT_DOT.test(input[index]);
};

export const findSymbolInSearchZone = (
  line: string,
  searchZone: { start: number; end: number }
) => {
  if (!line) return false;
  let searchString = line.substring(searchZone.start - 1, searchZone.end + 1);
  return searchString.match(IS_SPECIAL_CHAR_EXCEPT_DOT) !== null;
};

export const findPartNumbers = (input: string[]) => {
  let partNumbers = [];

  input.forEach((line, index) => {
    let numbersInLine = line.match(/[-+]?\d+/g);
    if (numbersInLine) {
      numbersInLine.forEach((number) => {
        let searchZone = {
          start: line.indexOf(number),
          end: line.indexOf(number) + number.length,
        };
        let previousLine = input[index - 1];
        let nextLine = input[index + 1];
        if (
          line.indexOf(number) === 0 ||
          line.indexOf(number) + number.length === line.length ||
          hasSymbolLeft(line, number) ||
          hasSymbolRight(line, number) ||
          findSymbolInSearchZone(previousLine, searchZone) ||
          findSymbolInSearchZone(nextLine, searchZone)
        ) {
          partNumbers.push(parseInt(number));
        }
      });
    }
  });

  return partNumbers;
};

export const sumPartNumbers = (input: string[]) => {
  let partNumbers = findPartNumbers(input);

  return partNumbers.reduce((a, b) => a + b);
};

export default function vadidate() {
  const engineSchematics = readFileSync(
    path.join(__dirname, "./validation.txt"),
    "utf-8"
  );
  const engineSchematicsLines = engineSchematics.split("\n");
  return sumPartNumbers(engineSchematicsLines);
}
