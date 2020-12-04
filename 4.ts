import * as utils from "./utils.ts";

const VALIDATION = {
  byr: (byr: string) => utils.between(byr, 1920, 2002),
  iyr: (iyr: string) => utils.between(iyr, 2010, 2020),
  eyr: (eyr: string) => utils.between(eyr, 2020, 2030),
  hgt: (hgt: string) => {
    const match = hgt.match(/^(\d+)(cm|in)$/);
    if (!match) return false;

    const value = match[1];
    const unit = match[2];

    if (unit === "cm") return utils.between(value, 150, 193);
    return utils.between(value, 59, 76);
  },
  hcl: (hcl: string) => /^#[0-9,a-f]{6}$/.test(hcl),
  ecl: (ecl: string) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl),
  pid: (pid: string) => /^\d{9}$/.test(pid),
};

type Field = keyof typeof VALIDATION;

const EXPECTED = Object.keys(VALIDATION) as Field[];

const lines = await utils.readFile(4);
const passports = lines.split("\n\n").map((data) => {
  const str = data.replace(/\n/g, " ");

  const passMap = str.split(" ").reduce((agg, curr) => {
    const [key, value] = curr.split(":");
    return agg.set(key, value);
  }, new Map<string, string>());

  return passMap;
});

function part1() {
  let numValid = 0;

  for (const passport of passports) {
    let valid = true;

    for (const e of EXPECTED) {
      if (passport.has(e)) continue;

      valid = false;
      break;
    }

    if (valid) numValid += 1;
  }

  console.log(numValid);
}

function part2() {
  let numValid = 0;

  for (const passport of passports) {
    let valid = true;

    for (const e of EXPECTED) {
      const value = passport.get(e);
      const validator = VALIDATION[e];

      if (value && validator(value)) continue;

      valid = false;
      break;
    }

    if (valid) numValid += 1;
  }

  console.log(numValid);
}

part1();
part2();
