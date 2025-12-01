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
}

const DIRECTIONS: Record<string, Vector2> = {
  '^': new Vector2(-1, 0),
  '>': new Vector2(0, 1),
  'v': new Vector2(1, 0),
  '<': new Vector2(0, -1),
}

const TRANSFORMATIONS: Record<string, string[]> = {
  '#': ['#', '#'],
  'O': ['[', ']'],
  '.': ['.', '.'],
  '@': ['@', '.'],
}

export async function day15_2() {
  const path = "day-15/input.txt";
  const file = await Bun.file(path).text();

  const parts = file.split('\n\n');
  const maze = parts[0].split('\n').map(p => p.split('').flatMap(c => TRANSFORMATIONS[c]));
  const moves = parts[1].split('').filter(p => p !== '\n');

  let player: Vector2 = findChar(maze, '@');

  console.table(maze);

  for (const move of moves) {
    const successfully = await moveCell(maze, player, DIRECTIONS[move]);
    if (successfully) player = player.add(DIRECTIONS[move]);
    // await Bun.sleep(400);
    // console.clear();
    console.table(maze);
  }

  let score = 0;

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      const current = maze[i][j];
      if (current === 'O') {
        score += 100 * i + j;
      }
    }
  }

  console.log(score);
}

async function moveCell(maze: string[][], cellToMove: Vector2, direction: Vector2): Promise<boolean> {
  const newPos = cellToMove.add(direction);
  const charAtNewPos = maze[newPos.x][newPos.y];

  if (charAtNewPos === '#') return false;
  if (charAtNewPos === '.') {
    console.log(".");
    await swap(maze, cellToMove, newPos);
    return true;
  }

  // Rock
  let successfully;

  // If direction is vertical
  if (direction === DIRECTIONS['^'] || direction === DIRECTIONS['v']) {
    const isLeftSide = charAtNewPos === '[';
    const otherRockPartPos = newPos.add(isLeftSide ? DIRECTIONS['>'] : DIRECTIONS['<']);
    successfully = await moveCell(maze, newPos, direction) &&
      await moveCell(maze, otherRockPartPos, direction);
  } else {
    successfully = await moveCell(maze, newPos, direction);
  }
  if (successfully) {
    console.log("success");

    await swap(maze, cellToMove, newPos);
  }
  return successfully;
}

async function swap(maze: string[][], player: Vector2, newPos: Vector2): Promise<void> {
  const aux = maze[player.x][player.y];
  maze[player.x][player.y] = maze[newPos.x][newPos.y];
  maze[newPos.x][newPos.y] = aux;
}

function findChar(matrix: string[][], searchChar: string): Vector2 {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === searchChar) {
        return new Vector2(i, j);
      }
    }
  }

  console.warn("Player not found. Wtf bro where you at??");
  return new Vector2(-1, -1);
}
