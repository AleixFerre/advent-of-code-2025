export async function day2_2() {
  const path = "day-2/input.txt";
  const file = await Bun.file(path).text();

  const allList = file.split("\n").filter((p) => p.length);

  let safeCount = 0;

  for (const sequence of allList) {
    const parsedSequence = sequence.split(" ").map((p) => parseInt(p));

    if (isSafe(parsedSequence)) {
      safeCount++;
      continue;
    }

    // Check for all variants
    for (let i = 0; i < parsedSequence.length; i++) {
      const checkSequence = parsedSequence.toSpliced(i, 1);

      if (isSafe(checkSequence)) {
        safeCount++;
        break;
      }
    }
  }

  console.log(safeCount);
}

function isSafe(sequence: number[]): boolean {
  const isIncreasing = sequence[0] < sequence[1];

  for (let i = 1; i < sequence.length; i++) {
    const element = sequence[i];
    const prevElement = sequence[i - 1];
    const difference = Math.abs(prevElement - element);

    if (difference < 1 || difference > 3) return false;
    if (isIncreasing !== prevElement < element) return false;
  }

  return true;
}
