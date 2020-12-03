import * as utils from "./utils.ts";

const lines = await utils.parseFile(3);
const map = lines.map((line) => line.split(""));

const TREE = "#";
const MAX_X = map[0].length;
const MAX_Y = map.length;

function traverse(xInc: number, yInc: number): number {
  let x = 0;
  let y = 0;
  let trees = 0;

  while (y < MAX_Y - 1) {
    x += xInc;
    y += yInc;

    if (x > MAX_X - 1) x = x % MAX_X;
    if (map[y][x] === TREE) trees += 1;
  }

  return trees;
}

function part1() {
  console.log(traverse(3, 1));
}

const PART_2_INPUTS = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

function part2() {
  const ans = PART_2_INPUTS.reduce(
    (product, [xInc, yInc]) => traverse(xInc, yInc) * product,
    1
  );

  console.log(ans);
}

part2();
