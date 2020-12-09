import * as utils from "./utils.ts";

const PREAMBLE = 25;

function getInvalidNumber(numbers: number[]): number {
  for (let i = PREAMBLE; i < numbers.length; i++) {
    const currNum = numbers[i];

    let valid = false;

    for (let firstIndex = i - PREAMBLE; firstIndex < i; firstIndex++) {
      for (let secondIndex = firstIndex + 1; secondIndex < i; secondIndex++) {
        if (firstIndex === secondIndex) continue;

        const first = numbers[firstIndex];
        const second = numbers[secondIndex];
        if (first + second !== currNum) continue;

        valid = true;
        break;
      }
    }

    if (!valid) return currNum;
  }

  throw new Error("None invalid");
}

function getContiguousSet(invalidNumber: number): number[] {
  let movingSet: number[] = [];
  let movingSum = 0;

  for (let i = 0; i < cypher.length; i++) {
    const num = cypher[i];

    movingSum += num;
    movingSet.push(num);

    if (movingSum > invalidNumber) {
      const { trimmed, sum } = trim(invalidNumber, movingSet);
      movingSet = trimmed;
      movingSum = sum;
    }

    if (movingSum === invalidNumber) {
      return movingSet;
    }
  }

  throw new Error("None valid");
}

function trim(
  target: number,
  set: number[]
): { trimmed: number[]; sum: number } {
  const trimmed = set.slice();
  let sum = trimmed.reduce((agg, curr) => agg + curr, 0);

  while (sum > target) {
    const cut = trimmed.shift();
    if (!cut) break;

    sum -= cut;
  }

  return { trimmed, sum };
}

const lines = await utils.parseFile(9);
const cypher = lines.map(Number);

const invalid = getInvalidNumber(cypher);
console.log(invalid);

const set = getContiguousSet(invalid).sort();
const weakness = set[0] + set[set.length - 1];

console.log(weakness);
