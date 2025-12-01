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

const VISITED_MARKER = '.';
const CURRENT_MARKER = '-';

const DIRECTIONS: Vector2[] = [
  new Vector2(0, -1),  // Top
  new Vector2(1, 0),   // Right
  new Vector2(0, 1),   // Bottom
  new Vector2(-1, 0),  // Left
];

export async function day12() {
  const path = "day-12/input.txt";
  const file = await Bun.file(path).text();

  const maze = file.split('\n').map(p => p.split(''));

  let total = 0;

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === VISITED_MARKER) continue;
      const plantId = maze[i][j];
      const currentPos = new Vector2(i, j);
      const [nPlants, nWalls] = lookAround(currentPos, plantId, maze);
      total += nPlants * nWalls;
      fillWithDots(currentPos, maze);
    }
  }
  console.log(total);
}

function fillWithDots(pos: Vector2, maze: string[][]): void {
  maze[pos.x][pos.y] = VISITED_MARKER;

  for (const direction of DIRECTIONS) {
    const newPos = pos.add(direction);
    const currentPlant = maze[newPos.x]?.[newPos.y];

    if (currentPlant === CURRENT_MARKER) {
      fillWithDots(newPos, maze);
    }
  }
}

function lookAround(pos: Vector2, id: string, maze: string[][]): [number, number] {
  maze[pos.x][pos.y] = CURRENT_MARKER;

  let nPlantsActual = 1;
  let nWallsActual = 0;

  for (const direction of DIRECTIONS) {
    const newPos = pos.add(direction);
    const currentPlant = maze[newPos.x]?.[newPos.y];

    if (currentPlant === CURRENT_MARKER) continue;
    if (currentPlant === id) {
      const [nPlants, nWalls] = lookAround(newPos, id, maze);
      nPlantsActual += nPlants;
      nWallsActual += nWalls;
    } else {
      nWallsActual++;
    }
  }

  return [nPlantsActual, nWallsActual];
}
