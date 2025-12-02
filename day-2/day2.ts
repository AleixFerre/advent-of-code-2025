export async function day2() {
  const path = "day-2/input.txt";
  const file = await Bun.file(path).text();

  const allList: string[][] = file.split(",").map(v => v.split('-'));

  let sum = 0;

  for (const item of allList) {
    const initial = parseInt(item[0]);
    const final = parseInt(item[1]);

    for (let i = initial; i <= final; i++) {
      const iStr = i.toString();
      const size = iStr.length;

      if (size % 2 !== 0) continue;

      const halfSize = size / 2;
      const firstPart = iStr.substring(0, halfSize);
      const secondPart = iStr.substring(halfSize);

      if (firstPart === secondPart) sum += i;
    }
  }

  console.log(sum);
}
