interface Vector2 {
  x: number;
  y: number;
}

export async function day4_2() {
  const path = "day-4/input.txt";
  const file = await Bun.file(path).text();

  let countXMAS = 0;
  const findWord = "MAS";
  const rfindWord = "SAM";
  const directions: Vector2[] = [
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ];

  const matrix = file
    .split("\n")
    .map((p) => p.split(""))
    .filter((p) => p.length);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const element = matrix[i][j];
      // Find for A
      if (element === findWord[1]) {
        let MAScount = 0;
        for (const direction of directions) {
          const directionalString = findTwoDirectionalString(
            matrix,
            { x: i, y: j },
            1,
            direction
          );

          if (
            directionalString === findWord ||
            directionalString === rfindWord
          ) {
            MAScount++;
          }
        }

        if (MAScount === 2) countXMAS++;
      }
    }
  }

  console.log(countXMAS);
}

function findTwoDirectionalString(
  matrix: string[][],
  origin: Vector2,
  length: number,
  direction: Vector2
): string {
  let finalStr = matrix[origin.x][origin.y];
  const accumulator = { x: 0, y: 0 };

  for (let i = 0; i < length; i++) {
    accumulator.x += direction.x;
    accumulator.y += direction.y;

    const pointPost: Vector2 = {
      x: origin.x + accumulator.x,
      y: origin.y + accumulator.y,
    };
    const pointPre: Vector2 = {
      x: origin.x - accumulator.x,
      y: origin.y - accumulator.y,
    };

    if (
      isOutOfBounds(pointPost, 0, matrix.length) ||
      isOutOfBounds(pointPre, 0, matrix.length)
    ) {
      return finalStr;
    }

    finalStr =
      matrix[pointPre.x][pointPre.y] +
      finalStr +
      matrix[pointPost.x][pointPost.y];
  }

  return finalStr;
}

function isOutOfBounds(v: Vector2, min: number, max: number): boolean {
  return v.x < min || v.x >= max || v.y < min || v.y >= max;
}
