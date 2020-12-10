import * as utils from "./utils.ts";

const lines = await utils.parseFile(10);
const adapters = lines.map(Number).sort((a, b) => a - b);
adapters.unshift(0);

function part1() {
  let oneJoltDiff = 0;
  let threeJoltDiff = 1;

  for (let i = 0; i < adapters.length - 1; i++) {
    const curr = adapters[i];
    const next = adapters[i + 1];

    const diff = next - curr;

    if (diff === 1) oneJoltDiff++;
    else if (diff === 3) threeJoltDiff++;
    else throw new Error();
  }

  const product = oneJoltDiff * threeJoltDiff;
  console.log(product);
}

const adapterSet = new Set(adapters);
const diffs = [1, 2, 3];
const combos = new Map<number, number>();

function poss(adapter: number): number {
  if (adapter === 0) return 1;

  const cached = combos.get(adapter);
  if (cached !== undefined) return cached;

  let agg = 0;

  for (const diff of diffs) {
    const next = adapter - diff;
    if (!adapterSet.has(next)) continue;

    agg += poss(next);
  }

  combos.set(adapter, agg);

  return agg;
}

function part2() {
  console.log(poss(adapters[adapters.length - 1]));
}

part1();
part2();
