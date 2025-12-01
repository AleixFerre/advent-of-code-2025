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
}

const DIRECTIONS: Vector2[] = [
  new Vector2(0, -1),  // Top
  new Vector2(1, 0),   // Right
  new Vector2(0, 1),   // Bottom
  new Vector2(-1, 0),  // Left
];


export async function day10_2() {
  const path = "day-10/input.txt";
  const file = await Bun.file(path).text();

  const maze: number[][] = file.split('\n').map(p => p.split('').map(p => parseInt(p)));

  const zeros: Vector2[] = [];

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 0) {
        zeros.push(new Vector2(i, j));
      }
    }
  }

  let total = 0;

  for (const zero of zeros) {
    const mazeCopy = JSON.parse(JSON.stringify(maze));
    const score = lookAround(zero, 0, mazeCopy);
    total += score;
  }

  console.log(total);
}

function lookAround(pos: Vector2, depth: number, maze: number[][]): number {
  if (maze[pos.x]?.[pos.y] !== depth) return 0;

  if (maze[pos.x][pos.y] === 9) {
    // maze[pos.x][pos.y] = -1;
    return 1;
  }

  let total = 0;
  for (const direction of DIRECTIONS) {
    total += lookAround(pos.add(direction), depth + 1, maze);
  }
  return total;
}
