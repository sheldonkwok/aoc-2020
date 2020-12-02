import * as utils from "./utils.ts";

const lines = await utils.parseFile(2);
const input = lines.map((line) => line.match(/^(\d+)-(\d+) (\w): (\w+)$/));

function getNumLetter(str: string, letter: string): number {
  let num = 0;

  for (const l of str) {
    if (l === letter) num += 1;
  }

  return num;
}

function part1() {
  let valid = 0;

  for (const line of input) {
    if (!line) throw new Error(`Invalid line ${line}`);
    const [_, lowerBound, upperBound, letter, password] = line;

    const num = getNumLetter(password, letter);
    if (Number(lowerBound) <= num && num <= Number(upperBound)) valid += 1;
  }

  console.log(valid);
}

function part2() {
  let valid = 0;

  for (const line of input) {
    if (!line) throw new Error(`Invalid line ${line}`);
    const [_, pos1, pos2, letter, password] = line;

    const l1 = password[Number(pos1) - 1];
    const l2 = password[Number(pos2) - 1];

    if (l1 !== l2 && (l1 === letter || l2 === letter)) {
      valid += 1;
    }
  }

  console.log(valid);
}

part2();
