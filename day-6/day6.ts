export async function day6() {
  const path = "day-6/input.txt";
  const file = await Bun.file(path).text();
  const matrix = file.split('\n').map(p => p.split(' ').filter(p => p));

  let sum = 0;

  for (let i = 0; i < matrix[0].length; i++) {
    const operation = matrix.at(-1)![i];
    let total = parseInt(matrix[0][i]);

    for (let j = 1; j < matrix.length - 1; j++) {
      const element = parseInt(matrix[j][i]);

      if (operation === '*') {
        total *= element;
      } else {
        total += element;
      }
    }
    sum += total;
  }

  console.log(sum);
}
