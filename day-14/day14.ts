class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  mult(times: number): Vector2 {
    return new Vector2(this.x * times, this.y * times);
  }

  limit(size: Vector2): Vector2 {
    const topBoundPos = new Vector2(
      this.x % size.x,
      this.y % size.y,
    );
    const botBoundPos = new Vector2(
      topBoundPos.x < 0 ? size.x + topBoundPos.x : topBoundPos.x,
      topBoundPos.y < 0 ? size.y + topBoundPos.y : topBoundPos.y
    );
    return botBoundPos;
  }

  toString(): string {
    return `(x: ${this.x}, y: ${this.y})`;
  }
}

export async function day14() {
  const path = "day-14/input.txt";
  const file = await Bun.file(path).text();

  const robots = file.split('\n').map(p => p.split(' ').map(
    p => p.slice(2).split(',').map(n => parseInt(n))
  ).map(p => new Vector2(p[0], p[1])) as [Vector2, Vector2]);

  const mazeSize: Vector2 = new Vector2(101, 103);

  const finalMatrix = [...Array(mazeSize.y)].map(() => Array(mazeSize.x).fill(0));

  const quadrants = [0, 0, 0, 0];

  for (const robot of robots) {
    const finalPos = moveRobot(robot, 100, mazeSize);
    finalMatrix[finalPos.y][finalPos.x]++;
    const quadrant = calculateQuadrant(finalPos, mazeSize);
    if (quadrant !== null) {
      quadrants[quadrant]++;
    }
  }

  console.log(quadrants);

  const total = quadrants.reduce((prev, curr) => prev * curr, 1);
  console.log(total);
}

function moveRobot(robot: [Vector2, Vector2], times: number, size: Vector2): Vector2 {
  return robot[0].add(robot[1].mult(times)).limit(size);
}

function calculateQuadrant(pos: Vector2, size: Vector2): number | null {
  const middlePoint = new Vector2(
    (size.x - 1) / 2,
    (size.y - 1) / 2,
  );

  if (pos.x === middlePoint.x || pos.y === middlePoint.y) return null;

  return booleansToNumber(pos.x < middlePoint.x, pos.y < middlePoint.y);
}

function booleansToNumber(a: boolean, b: boolean): number {
  return (a ? 1 : 0) | ((b ? 1 : 0) << 1);
}
