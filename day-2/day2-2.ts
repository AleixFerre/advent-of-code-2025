export async function day2_2() {
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

      for (let splitSize = 2; splitSize <= size; splitSize++) {
        const parts = splitEvenly(iStr, splitSize);

        if (!parts) continue;

        if (allAreSame(parts)) {
          sum += i;
          break;
        }
      }
    }
  }

  console.log(sum);
}

function allAreSame(parts: string[]): boolean {
  const first = parts[0];

  for (const part of parts) {
    if (part !== first) return false;
  }

  return true;
}

function splitEvenly(str: string, parts: number): string[] | null {
  const splitted: string[] = [];

  if (str.length % parts !== 0) return null;

  const size = str.length / parts;

  for (let i = 0; i < str.length; i += size) {
    splitted.push(str.substring(i, i + size));
  }

  return splitted;
}
