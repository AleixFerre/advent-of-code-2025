export async function day9() {
  const path = "day-9/input.txt";
  const file = await Bun.file(path).text();

  const values = file.split("").map(p => parseInt(p));

  const str: string[] = [];
  const points: number[] = [];

  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    if (i % 2 === 0) {
      for (let j = 0; j < element; j++) {
        str.push((i / 2).toString())
      }
    } else {
      for (let j = 0; j < element; j++) {
        str.push('.');
        points.push(str.length - 1);
      }
    }
  }

  let pointsIndex = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === '.') continue;
    const currentPointIndex = points[pointsIndex];
    if (currentPointIndex > i) break;
    swapIndexes(str, i, currentPointIndex);
    pointsIndex++;
  }

  let total = 0;

  for (let i = 0; i < str.length; i++) {
    const num = str[i];
    if (num === '.') break;
    const parsedNum = parseInt(num);
    total += i * parsedNum;
  }

  console.log(total);
}

function swapIndexes(str: string[], i1: number, i2: number): void {
  const auxA = str[i1];
  str[i1] = str[i2];
  str[i2] = auxA;
}