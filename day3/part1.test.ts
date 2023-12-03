import {
  findPartNumbers,
  findSymbolInSearchZone,
  hasSymbolLeft,
  hasSymbolRight,
  sumPartNumbers,
} from ".";

describe("find symbol around number", () => {
  it.each([
    ["$467..114..", "467", true],
    ["467..114..", "467", false],
    [".467..114..", "467", false],
    ["$467..114..", "114", false],
    ["467..#114..", "114", true],
  ])("should find symbol left of number", (input, number, expected) => {
    expect(hasSymbolLeft(input, number)).toBe(expected);
  });

  it.each([
    ["467#..114..", "467", true],
    ["467$..114..", "467", true],
    ["467..114#..", "114", true],
    ["467..114..", "114", false],
    ["467..114", "114", false],
  ])("should find symbol right of number", (input, number, expected) => {
    expect(hasSymbolRight(input, number)).toBe(expected);
  });
});

test("should find symbol at top left of number", () => {
  expect(findSymbolInSearchZone("...*......", { start: 2, end: 3 })).toBe(true);
});

test("should return number adjacent to symbol", () => {
  const testCase = [
    "467...114.",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..5*92.....",
    "..592.....",
    "......755.",
    "...$.*..1.",
    ".664.598..",
  ];

  expect(findPartNumbers(testCase)).toStrictEqual([
    467, 35, 633, 617, 5, 92, 592, 755, 664, 598,
  ]);
});

test("should return sum of part numbers", () => {
  const testCase = [
    " 467..114..",
    "...*......",
    "..35..633.",
    "......#..",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];

  expect(sumPartNumbers(testCase)).toBe(4361);
});

test("should return sum of part numbers", () => {
  const testCase = [
    "12.......*..",
    "+.........34",
    ".......-12..",
    "..78........",
    "..*....60...",
    "78..........",
    ".......23...",
    "....90*12...",
    "............",
    "2.2......12.",
    ".*.........*",
    "1.1.......56",
    "2.2......12.",
    ".*.........*",
    "1.1..503+.56",
  ];
  expect(sumPartNumbers(testCase)).toBe(925);
});
