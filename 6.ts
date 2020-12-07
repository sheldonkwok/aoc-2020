import * as utils from "./utils.ts";

const lines = await utils.readFile(6);
const groups = lines.split("\n\n");

let part1Sum = 0;
let part2Sum = 0;

for (const group of groups) {
  const members = group.split("\n");
  const votesMap = new Map<string, number>();

  for (const member of members) {
    const votes = member.split("");

    for (const vote of votes) {
      const existingVote = votesMap.get(vote);
      const toSet = existingVote !== undefined ? existingVote + 1 : 1;

      votesMap.set(vote, toSet);
    }
  }

  part1Sum += votesMap.size;

  votesMap.forEach((count) => {
    if (count === members.length) part2Sum++;
  });
}

console.log(part1Sum);
console.log(part2Sum);
