export async function day1_2() {
  const path = "day-1/input.txt";
  const file = await Bun.file(path).text();

  const allList = file.split("\n");

  // Get both the lists
  const firstList: number[] = allList.map((p) => parseInt(p.split("   ")[0])).filter((p) => !isNaN(p));
  const secondList: number[] = allList.map((p) => parseInt(p.split("   ")[1])).filter((p) => !isNaN(p));

  const numOccurrences: Record<number, number> = {};

  for (const element of secondList) {
    if (!numOccurrences[element]) {
      numOccurrences[element] = 0;
    }
    numOccurrences[element]++;
  }

  let score = 0;

  for (const element of firstList) {
    if (!numOccurrences[element]) continue;
    score += element * numOccurrences[element];
  }

  console.log(score);
}
