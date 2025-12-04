export async function day3() {
  const path = "day-3/input.txt";
  const file = await Bun.file(path).text();

  const allList: string[] = file.split("\n");
  let sum = 0;

  for (const numbers of allList) {
    let max = 0;
    for (let i = 0; i < numbers.length; i++) {
      const element = numbers[i];
      for (let j = i + 1; j < numbers.length; j++) {
        const fullNum = element + numbers[j];
        const parsedNum = parseInt(fullNum);
        if (parsedNum > max) max = parsedNum;
      }
    }
    sum += max;
  }

  console.log(sum);
}
