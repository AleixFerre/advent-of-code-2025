export async function day1() {
  const path = "day-1/input.txt";
  const file = await Bun.file(path).text();

  const allList: [string, number][] = file.split("\n").map(v => [v.substring(0, 1), parseInt(v.substring(1))]);

  let rotation = 50;

  let timesToZero = 0;

  for (const item of allList) {
    if (item[0] == 'R') {
      rotation += item[1];
    } else {
      rotation -= item[1];
    }

    rotation = ((rotation % 100) + 100) % 100;

    if (rotation === 0) {
      timesToZero++;
    }
  }

  console.log(timesToZero);
}
