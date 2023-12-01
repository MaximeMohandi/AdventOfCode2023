import { readFileSync } from "fs";
const path = require("path");

export function convertSpelledOutNumbersToDigits(line: string): string {
  const spelledOutNumbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  let search = "";
  let result = [];
  for (let i = 0; i < line.length; i++) {
    if (!isNaN(parseInt(line[i]))) {
      result.push(line[i]);
      search = "";
    } else {
      search += line[i];
      let isSearchMatch = search.match(
        /(one|two|three|four|five|six|seven|eight|nine)/g
      );
      if (isSearchMatch !== null) {
        spelledOutNumbers.forEach((number, index) => {
          if (number === isSearchMatch[0]) {
            result.push(index + 1);
          }
        });
        search = "";
        i--;
      }
    }
  }

  return result.join("");
}

export const extractValueFromCalibrationLine = (line: string): number => {
  line = convertSpelledOutNumbersToDigits(line);
  let firstDigit = line.match(/\d/);
  let lastDigit = line.match(/\d(?=\D*$)/);

  if (lastDigit === null) {
    lastDigit = firstDigit;
  }

  return parseInt(`${firstDigit}${lastDigit}`);
};

export function sumOfCalibrationValue(entry: string[]): number {
  let calibrationValues = entry.map((line) =>
    extractValueFromCalibrationLine(line)
  );
  return calibrationValues.reduce((acc, curr) => acc + curr);
}

export default function validate() {
  const validationFile = readFileSync(
    path.join(__dirname, "./validation.txt"),
    "utf-8"
  );
  let lines: string[] = validationFile.split("\r\n");
  return sumOfCalibrationValue(lines);
}
