import {
  convertSpelledOutNumbersToDigits,
  extractValueFromCalibrationLine,
  sumOfCalibrationValue,
} from ".";

test("when string as spelled out numbers then convert to digits", () => {
  let entry = "one5two";
  let resp = convertSpelledOutNumbersToDigits(entry);
  expect(resp).toEqual("152");
});

test("when string with only one spelled out number then return last and first digit", () => {
  let entry = "one";
  let resp = extractValueFromCalibrationLine(entry);
  expect(resp).toEqual(11);
});

test("when string with only spelled out numbers then return last and first digit", () => {
  let entry = "eighthree";
  let resp = extractValueFromCalibrationLine(entry);
  expect(resp).toEqual(83);
});

test("should sum all calibration values with spelled out number", () => {
  let entry = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
  ];
  let resp = sumOfCalibrationValue(entry);

  expect(resp).toEqual(281);
});
