import * as utils from "./utils.ts";

const FLOOR = ".";
const EMPTY = "L";
const OCCUPIED = "#";

const DIRECTIONS = [
  [-1, -1],
  [-1, -0],
  [-1, 1],

  [0, -1],
  [0, 1],

  [1, -1],
  [1, -0],
  [1, 1],
];

const lines = await utils.parseFile(11);
const layout = lines.map((l) => l.split(""));

const yBound = layout.length - 1;
const xBound = layout[0].length - 1;

function inBounds(y: number, x: number) {
  return utils.between(y, 0, yBound) && utils.between(x, 0, xBound);
}

function getAdjOccupied(grid: string[][], y: number, x: number) {
  let numAdjacent = 0;

  for (const [yDiff, xDiff] of DIRECTIONS) {
    const checkY = y + yDiff;
    const checkX = x + xDiff;

    if (!inBounds(checkY, checkX)) continue;
    if (grid[checkY][checkX] === OCCUPIED) numAdjacent++;
  }

  return numAdjacent;
}

function getSightOccupied(grid: string[][], y: number, x: number) {
  let occ = 0;

  for (const [yDiff, xDiff] of DIRECTIONS) {
    let checkY = y + yDiff;
    let checkX = x + xDiff;

    while (inBounds(checkY, checkX)) {
      const check = grid[checkY][checkX];

      if (check === OCCUPIED) occ++;
      if (check !== FLOOR) break;

      checkY += yDiff;
      checkX += xDiff;
    }
  }

  return occ;
}

function getTotalOccupied(
  occupiedThreshold: number,
  check: (grid: string[][], y: number, x: number) => number
): number {
  let changing = true;
  let numOccupied = 0;
  let prevLayout = utils.clone(layout);

  while (changing) {
    changing = false;
    numOccupied = 0;

    const newLayout = utils.clone(prevLayout);

    for (let y = 0; y < prevLayout.length; y++) {
      const row = prevLayout[y];

      for (let x = 0; x < row.length; x++) {
        const seat = row[x];
        if (seat === FLOOR) continue;

        const checkOccupied = check(prevLayout, y, x);

        if (seat === EMPTY && checkOccupied === 0) {
          newLayout[y][x] = OCCUPIED;
          changing = true;
          numOccupied++;
        } else if (seat === OCCUPIED && checkOccupied >= occupiedThreshold) {
          newLayout[y][x] = EMPTY;
          changing = true;
        } else if (seat === OCCUPIED) {
          numOccupied++;
        }
      }
    }

    prevLayout = newLayout;
  }

  return numOccupied;
}

function part1() {
  console.log(getTotalOccupied(4, getAdjOccupied));
}

function part2() {
  console.log(getTotalOccupied(5, getSightOccupied));
}

part1();
part2();
