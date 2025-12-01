export async function day7() {
  const path = "day-7/input.txt";
  const file = await Bun.file(path).text();

  const values = file.split("\n").map(p => p.split(": ")).map(p => [
    parseInt(p[0]),
    p[1].split(" ").map(n => parseInt(n))
  ] as [number, number[]]);

  let totalScore = 0;

  for (const value of values) {
    if (checkCombinations(value[0], value[1])) {
      totalScore += value[0];
    }
  }

  console.log(totalScore);

}

function checkCombinations(result: number, list: number[]): boolean {
  if (list.length <= 1) {
    return list[0] === result;
  }

  return checkCombinations(result, [list[0] * list[1], ...list.slice(2)]) ||
    checkCombinations(result, [list[0] + list[1], ...list.slice(2)]);
}
