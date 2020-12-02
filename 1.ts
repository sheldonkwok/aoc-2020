const DESIRED_SUM = 2020;

const text = await Deno.readTextFile("./input/1.txt");
const input = text
  .trim()
  .split("\n")
  .map((line) => Number(line));

// We don't need to cache dup entries cause adding numbers is cheaper than the hash check

export async function part1() {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (i === j) continue;

      const a = input[i];
      const b = input[j];

      const sum = a + b;
      if (sum === DESIRED_SUM) {
        console.log(a * b);
        return;
      }
    }
  }
}

export async function part2() {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        if (i === j || i === k || j === k) continue;

        const a = input[i];
        const b = input[j];
        const c = input[k];

        const sum = a + b + c;
        if (sum === DESIRED_SUM) {
          console.log(a * b * c);
          return;
        }
      }
    }
  }
}

part2();
