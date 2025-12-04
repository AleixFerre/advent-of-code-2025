export async function day4_2() {
  const path = "day-4/input.txt";
  const file = await Bun.file(path).text();

  let board: string[] = file.split("\n");
  let sum = 0;

  let amount = -1;

  while (amount !== 0) {
    [board, amount] = removePapers(board);
    sum += amount;
  }

  console.log(sum);
}

function removePapers(board: string[]): [string[], number] {
  let sum = 0;
  let newBoard = [...board];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '@' && isAccessible(i, j, board)) {
        newBoard[i] = replaceAt(newBoard[i], j, '.');
        sum++;
      }
    }
  }
  return [newBoard, sum];
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

function replaceAt(str: string, index: number, replacement: string): string {
  return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}