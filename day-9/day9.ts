export async function day9() {
  const path = "day-9/input-big.txt";
  const file = await Bun.file(path).text();

  const points = file.split('\n').map(p => p.split(",").map(s => parseInt(s)));

  let max = 0;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = area(points[i], points[j]);
      if (a > max) max = a;
    }
  }

  console.log(max);
}

function area(p1: number[], p2: number[]): number {
  const sideX = Math.abs(p1[0] - p2[0] + 1);
  const sideY = Math.abs(p1[1] - p2[1] + 1);
  return sideX * sideY;
}