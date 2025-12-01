const cachedBlinks: Map<string, number> = new Map();

export async function day11_2() {
  const path = "day-11/input.txt";
  const file = await Bun.file(path).text();

  let stones = file.split(' ').map(p => parseInt(p));

  let stonesCopy: number = 0;
  for (const stone of stones) {
    stonesCopy += blink(stone, 75);
  }

  console.log(stonesCopy);
}

function blink(stone: number, steps: number): number {
  let stonesAmount = 0;

  if (steps === 0) return 1;

  const keyString = JSON.stringify([stone, steps]);
  if (cachedBlinks.has(keyString)) {
    return cachedBlinks.get(keyString)!;
  }

  // If 0, then 1.
  if (stone === 0) stonesAmount += blink(1, steps - 1);
  // If even number of digits, then split digits.
  else if (stone.toString().length % 2 === 0) {
    const stoneStr = stone.toString();
    stonesAmount += blink(parseInt(stoneStr.slice(0, stoneStr.length / 2)), steps - 1);
    stonesAmount += blink(parseInt(stoneStr.slice(stoneStr.length / 2)), steps - 1);
  }
  // Else, multiply by 2024.
  else stonesAmount += blink(stone * 2024, steps - 1);

  cachedBlinks.set(keyString, stonesAmount);

  return stonesAmount;
}
