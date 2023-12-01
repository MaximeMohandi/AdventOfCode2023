import { extractValueFromCalibrationLine, sumOfCalibrationValue } from ".";

test("should combine first and last digits of string", () => {
  let entry = "a1b2c3d4e5f";

  let resp = extractValueFromCalibrationLine(entry);
  expect(resp).toEqual(15);
});

test("when only one digit then duplicate it", () => {
  let entry = "treb7uchet";

  let resp = extractValueFromCalibrationLine(entry);
  expect(resp).toEqual(77);
});

test("should sum all calibration values", () => {
  let entry = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
  let resp = sumOfCalibrationValue(entry);

  expect(resp).toEqual(142);
});
