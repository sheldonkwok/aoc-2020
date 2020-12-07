import * as utils from "./utils.ts";

const lines = await utils.parseFile(7);

const TARGET_COLOR = "shiny gold";
const bags = new Map<string, Map<string, number>>();

function canHoldShinyGold(color: string): boolean {
  const contents = bags.get(color);
  if (!contents) return false;

  for (const [contentColor] of contents) {
    if (contentColor === TARGET_COLOR) return true;

    const poss = canHoldShinyGold(contentColor);
    if (poss) return true;
  }

  return false;
}

function countContents(color: string): number {
  const contents = bags.get(color);
  if (!contents || contents.size === 0) return 1;

  let count = 0;

  for (const [contentColor, contentCount] of contents) {
    const subCount = countContents(contentColor);

    count += contentCount * subCount;
    if (subCount !== 1) {
      count += contentCount;
    }
  }

  return count;
}

for (const line of lines) {
  const [holder, contentStr] = line.split(" bags contain ");

  const holderMap = new Map<string, number>();
  bags.set(holder, holderMap);

  if (contentStr === "no other bags.") continue;

  const contents = contentStr.split(", ");

  for (const content of contents) {
    const match = content.match(/^(\d+) (\w+ \w+) bags?/);
    if (!match) throw new Error(`Invalid content ${content}`);

    const count = match[1];
    const color = match[2];

    holderMap.set(color, Number(count));
  }
}

function part1() {
  let poss = 0;

  for (const [color] of bags) {
    if (canHoldShinyGold(color)) poss++;
  }

  console.log(poss);
}

function part2() {
  const count = countContents(TARGET_COLOR);
  console.log(count);
}

part1();
part2();
