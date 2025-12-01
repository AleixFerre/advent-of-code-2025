export async function day2_2_optimized() {
  const path = "day-2/input.txt";
  const file = await Bun.file(path).text();

  const allList = file.split("\n").filter((p) => p.length);

  let safeCount = 0;

  for (const sequence of allList) {
    const parsedSequence = sequence.split(" ").map((p) => parseInt(p));

    const safeInfo = isSafe(parsedSequence);

    if (safeInfo.safe) {
      safeCount++;
      continue;
    }

    // Check for only the needed variants sorted in probability of appearance
    // First we put the index and the index + 1, that are the most probable to appear kinda equally
    // The only way to find a index - 1 is in the first index (0)
    // We put last the 0 because this is only 1 case, and the index (and +1) are N cases
    const indexes = [safeInfo.index + 1, safeInfo.index, 0];

    for (const i of indexes) {
      const checkSequence = parsedSequence.toSpliced(i, 1);

      if (isSafe(checkSequence).safe) {
        safeCount++;
        break;
      }
    }
  }

  console.log(safeCount);
}

function isSafe(sequence: number[]): { safe: boolean; index: number } {
  const isIncreasing = sequence[0] < sequence[1];

  for (let i = 1; i < sequence.length; i++) {
    const element = sequence[i];
    const prevElement = sequence[i - 1];
    const difference = Math.abs(prevElement - element);

    if (difference < 1 || difference > 3) return { safe: false, index: i - 1 };
    if (isIncreasing !== prevElement < element) return { safe: false, index: i - 1 };
  }

  return { safe: true, index: -1 };
}
