export async function day9_2() {
  const path = "day-9/input.txt";
  const file = await Bun.file(path).text();

  const values = file.split("").map(p => parseInt(p));

  const str: string[] = [];
  const points: number[][] = [];

  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    if (i % 2 === 0) {
      for (let j = 0; j < element; j++) {
        str.push((i / 2).toString())
      }
    } else {
      const currentPoints = [];
      for (let j = 0; j < element; j++) {
        str.push('.');
        currentPoints.push(str.length - 1);
      }
      if (currentPoints.length) points.push(currentPoints);
    }
  }

  let currentNum = parseInt(str[str.length - 1]);

  let currentStr: string[] = [];
  for (let i = str.length - 1; i >= 0; i--) {
    const firstChar = currentStr[0];
    if (str[i] !== firstChar && currentStr.length > 0) {
      if (firstChar !== '.') {
        const newNum = parseInt(currentStr[0]);
        if (newNum <= currentNum) {
          currentNum = newNum;
          const firstIndex = findFirstFittedIndex(points, currentStr, i);
          if (firstIndex !== -1) {
            swapBlock(currentStr, i, str, points, firstIndex);
          }
        }
      }
      currentStr = [];
    }
    currentStr.push(str[i]);
  }

  let total = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '.') continue;
    const parsedNum = parseInt(str[i]);
    total += i * parsedNum;
  }

  console.log(total);
}

function swapBlock(currentStr: string[], i: number, str: string[], points: number[][], firstIndex: number) {
  for (let j = 0; j < currentStr.length; j++) {
    const swapIndex = i + j + 1;
    swapIndexes(str, swapIndex, points[firstIndex][j]);
  }
  points[firstIndex].splice(0, currentStr.length);
}

function swapIndexes(str: string[], i1: number, i2: number): void {
  const auxA = str[i1];
  str[i1] = str[i2];
  str[i2] = auxA;
}

function findFirstFittedIndex(points: number[][], currentStr: string[], maxIndex: number): number {
  for (let i = 0; i < points.length; i++) {
    if (points[i][0] > maxIndex) return -1;
    if (currentStr.length <= points[i].length) return i;
  }
  return -1;
}
