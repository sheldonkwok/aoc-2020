import * as utils from "./utils.ts";

const ROW_PARTITION = 7;

const lines = await utils.parseFile(5);
// const lines = ["FBFBBFFRLR"];

function getRow(seat: string): number {
  let lower = 0;
  let upper = 127;

  for (let i = 0; i < seat.length - 1; i++) {
    const letter = seat[i];
    const diff = Math.round((upper - lower) / 2);

    if (letter === "F") upper -= diff;
    if (letter === "B") lower += diff;
  }

  const last = seat[seat.length - 1];
  return last === "F" ? lower : upper;
}

function getCol(seat: string): number {
  let lower = 0;
  let upper = 7;

  for (let i = 0; i < seat.length - 1; i++) {
    const letter = seat[i];
    const diff = Math.round((upper - lower) / 2);

    if (letter === "L") upper -= diff;
    if (letter === "R") lower += diff;
  }

  const last = seat[seat.length - 1];
  return last === "L" ? lower : upper;
}

function getId(line: string): number {
  const row = getRow(line.slice(0, ROW_PARTITION));
  const col = getCol(line.slice(ROW_PARTITION));
  const id = row * 8 + col;

  return id;
}

function part1() {
  let highest = 0;

  for (const line of lines) {
    const id = getId(line);
    if (id > highest) highest = id;
  }

  console.log(highest);
}

function part2() {
  const seats = lines.map(getId).sort();

  for (let i = 0; i < seats.length - 1; i++) {
    const id = seats[i];
    const nextId = seats[i + 1];

    if (nextId - id === 2) console.log(id + 1);
  }
}

part1();
part2();
