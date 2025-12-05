export async function day5_2() {
  const path = "day-5/input.txt";
  const file = await Bun.file(path).text();

  const both: string[] = file.split("\n\n");
  const ranges = both[0].split('\n').map(p => p.split('-').map(p => parseInt(p))).toSorted((a, b) => a[0] - b[0]);

  // Normalitzem els ranges
  for (let i = 1; i < ranges.length; i++) {
    const prev = ranges[i - 1];
    const actual = ranges[i];
    if (hasOverlap(prev, actual)) {
      prev[0] = Math.min(prev[0], actual[0]);
      prev[1] = Math.max(prev[1], actual[1]);
      ranges.splice(i, 1);
      i--;
    }
  }

  let sum = 0;
  for (const range of ranges) {
    sum += range[1] - range[0] + 1; // +1 perque es inclusiu (que asco)
  }

  console.log(sum);
}

function hasOverlap(prev: number[], actual: number[]): boolean {
  return actual[0] <= prev[1];
}
