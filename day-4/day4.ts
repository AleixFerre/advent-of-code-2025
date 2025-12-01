interface Vector2 {
  x: number;
  y: number;
}

export async function day4() {
  const path = "day-4/input.txt";
  const file = await Bun.file(path).text();

  let countXMAS = 0;
  const findWord = "XMAS";
  const directions: Vector2[] = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ];

  const matrix = file
    .split("\n")
    .map((p) => p.split(""))
    .filter((p) => p.length);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const element = matrix[i][j];
      if (element === findWord[0]) {
        for (const direction of directions) {
          const directionalString = findDirectionalString(
            matrix,
            { x: i, y: j },
            findWord.length,
            direction
          );

          if (directionalString === findWord) {
            countXMAS++;
          }
        }
      }
    }
  }

  console.log(countXMAS);
}

function findDirectionalString(
  matrix: string[][],
  origin: Vector2,
  length: number,
  direction: Vector2
): string {
  let finalStr = "";
  const index = origin;

  for (let i = 0; i < length; i++) {
    if (
      isOutOfBounds(index.x, 0, matrix.length) ||
      isOutOfBounds(index.y, 0, matrix.length)
    ) {
      return finalStr;
    }

    finalStr += matrix[index.x][index.y];

    index.x += direction.x;
    index.y += direction.y;
  }

  return finalStr;
}

function isOutOfBounds(n: number, min: number, max: number): boolean {
  return n < min || n >= max;
}
