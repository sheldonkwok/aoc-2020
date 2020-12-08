import * as utils from "./utils.ts";

interface Instruction {
  operation: string;
  argument: number;
}

interface BootOut {
  accumulator: number;
  loop: boolean;
}

function boot(instructions: Instruction[]): BootOut {
  const visitedOperations = new Array<boolean>(instructions.length).fill(false);

  let cursor = 0;
  let accumulator = 0;

  while (cursor < instructions.length) {
    const visited = visitedOperations[cursor];
    if (visited) return { accumulator, loop: true };

    visitedOperations[cursor] = true;
    const { operation, argument } = instructions[cursor];

    if (operation === "jmp") {
      cursor += argument;
      continue;
    }

    if (operation === "acc") {
      accumulator += argument;
    }

    cursor++;
  }

  return { accumulator, loop: false };
}

const lines = await utils.parseFile(8);
const originalInstructions = lines.map<Instruction>((l) => {
  const [operation, argument] = l.trim().split(" ");
  return { operation, argument: Number(argument) };
});

function part1() {
  const res = boot(originalInstructions);
  console.log(res.accumulator);
}

function part2() {
  for (let i = 0; i < originalInstructions.length; i++) {
    const ins = originalInstructions[i];
    const { operation, argument } = ins;

    if (operation === "acc") continue;

    const newOp = operation === "jmp" ? "nop" : "jmp";
    if (newOp === "jmp" && argument === 0) continue;

    const clone = originalInstructions.slice();
    clone[i] = { operation: newOp, argument };

    const res = boot(clone);

    if (!res.loop) {
      console.log(res.accumulator);
      break;
    }
  }
}

part1();
part2();
