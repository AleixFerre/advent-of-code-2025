export async function day3_2() {
  const path = "day-3/input.txt";
  const file = await Bun.file(path).text();

  const allList: string[] = file.split("\n");
  let sum = 0;


  console.log(sum);
}
