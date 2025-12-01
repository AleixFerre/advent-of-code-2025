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

const DIRECTIONS: Record<string, Vector2> = {
  '^': new Vector2(-1, 0),
  '>': new Vector2(0, 1),
  'v': new Vector2(1, 0),
  '<': new Vector2(0, -1),
}

export async function day15() {
  const path = "day-15/input.txt";
  const file = await Bun.file(path).text();

  const parts = file.split('\n\n');
  const maze = parts[0].split('\n').map(p => p.split(''));
  const moves = parts[1].split('').filter(p => p !== '\n');

  let player: Vector2 = findChar(maze, '@');

  for (const move of moves) {
    const successfully = moveCell(maze, player, DIRECTIONS[move]);
    if (successfully) player = player.add(DIRECTIONS[move]);
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

function moveCell(maze: string[][], cellToMove: Vector2, direction: Vector2): boolean {
  const newPos = cellToMove.add(direction);
  const charAtNewPos = maze[newPos.x][newPos.y];

  if (charAtNewPos === '#') return false;
  if (charAtNewPos === '.') {
    swap(maze, cellToMove, newPos);
    return true;
  }

  // Rock
  const successfully = moveCell(maze, newPos, direction);
  if (successfully) swap(maze, cellToMove, newPos);
  return successfully;
}

function swap(maze: string[][], player: Vector2, newPos: Vector2) {
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
