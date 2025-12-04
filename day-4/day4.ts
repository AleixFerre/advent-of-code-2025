export async function day4() {
  const path = "day-4/input.txt";
  const file = await Bun.file(path).text();

  const board: string[] = file.split("\n");
  let sum = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '@' && isAccessible(i, j, board)) {
        sum++;
      }
    }
  }

  console.log(sum);
}

function isAccessible(x: number, y: number, board: string[]): boolean {
  let sum = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i < 0 || i >= board.length || j < 0 || j >= board.length) continue;
      if (board[i][j] === '@') {
        sum++;
        if (sum > 4) return false; // Es conta a si mateix el retrasat, no es inclusiu
      }
    }
  }
  return true;
}
