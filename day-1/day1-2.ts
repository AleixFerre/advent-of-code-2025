export async function day1_2() {
  const path = "day-1/input.txt";
  const file = await Bun.file(path).text();

  const allList: [string, number][] = file.split("\n").map(v => [v.substring(0, 1), parseInt(v.substring(1))]);

  let rotation = 50;
  let timesThroughZero = 0;

  for (const item of allList) {
    const direction = item[0];

    for (let i = 0; i < item[1]; i++) {
      if (direction == 'R') {
        rotation += 1;

        if (rotation === 100) {
          rotation = 0;
        }
      } else {
        rotation -= 1;

        if (rotation === -1) {
          rotation = 99;
        }
      }
      if (rotation === 0) timesThroughZero++;
    }
  }

  console.log(timesThroughZero);
}
