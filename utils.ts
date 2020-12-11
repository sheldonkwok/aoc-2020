export async function readFile(question: number): Promise<string> {
  const text = await Deno.readTextFile(`./input/${question}.txt`);

  return text.trim();
}

export async function parseFile(question: number): Promise<string[]> {
  const text = await readFile(question);
  return text.split("\n");
}

export function between(
  value: string | number,
  lower: number,
  upper: number
): boolean {
  const num = typeof value === "string" ? Number(value) : value;
  if (num === NaN) return false;

  return lower <= value && value <= upper;
}

export function clone<T>(toClone: T): T {
  return JSON.parse(JSON.stringify(toClone)) as T;
}
