export async function day5() {
  const path = "day-5/input.txt";
  const file = await Bun.file(path).text();

  const both: string[] = file.split("\n\n");
  const ranges = both[0].split('\n').map(p => p.split('-').map(p => parseInt(p))).toSorted((a, b) => a[0] - b[0]);
  const ingredients = both[1].split('\n').map(p => parseInt(p));
  let sum = 0;

  for (const ingredient of ingredients) {
    if (isInAnyRange(ingredient, ranges)) sum++;
  }

  console.log(sum);
}

function isInAnyRange(ingredient: number, ranges: number[][]): boolean {
  let low = 0;
  let high = ranges.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const [start, end] = ranges[mid];

    if (ingredient < start) {
      high = mid - 1;
    } else if (ingredient > end) {
      low = mid + 1;
    } else {
      return true;
    }
  }
  return false;
}
