export async function parseFile(question: number): Promise<string[]> {
  const text = await Deno.readTextFile(`./input/${question}.txt`);
  return text.trim().split("\n");
}
