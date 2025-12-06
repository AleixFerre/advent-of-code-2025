interface Operation {
  operation: string,
  numbers: number[],
}

// [
//   {
//     operation: "*",
//     numbers: [1, 24, 356]
//   },
//   ...
// ]

export async function day6_2() {
  const path = "day-6/input.txt";
  const file = await Bun.file(path).text();

  const rows = file.split('\n');

  const lastRow = rows.at(-1)!;

  const operations: Operation[] = [];

  let operation = "";
  let numbers: number[] = [];
  for (let i = 0; i < lastRow.length + 1; i++) {
    let localNum = "";

    if (lastRow[i] === '*' || lastRow[i] === '+') {
      operation = lastRow[i];
    }

    for (let j = 0; j < rows.length - 1; j++) {
      const element = rows[j][i];
      localNum += element;
    }

    const localNumParsed = parseInt(localNum);
    if (localNumParsed) {
      numbers.push(localNumParsed);
    } else {
      operations.push({
        operation,
        numbers
      });

      numbers = [];
      operation = "";
    }
  }

  // He fet servir reduce en ves d'un doble for pa'cerme el chulo
  const sum = operations.reduce(
    (total, { operation, numbers }) =>
      total +
      numbers.reduce(
        (acc, n) => (operation === '*' ? acc * n : acc + n),
        operation === '*' ? 1 : 0
      ),
    0
  );

  console.log(sum);
}
