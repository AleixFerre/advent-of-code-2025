export async function day11() {
  const path = "day-11/input.txt";
  const file = await Bun.file(path).text();

  let stones = file.split(' ').map(p => parseInt(p));

  for (let i = 0; i < 25; i++) {
    stones = blink(stones);
  }

  console.log(stones.length);
}

function blink(stones: number[]): number[] {
  const stonesCopy: number[] = [];

  for (const stone of stones) {
    // If 0, then 1.
    if (stone === 0) stonesCopy.push(1);
    // If even number of digits, then split digits.
    else if (stone.toString().length % 2 === 0) {
      const stoneStr = stone.toString();
      stonesCopy.push(parseInt(stoneStr.slice(0, stoneStr.length / 2)));
      stonesCopy.push(parseInt(stoneStr.slice(stoneStr.length / 2)));
    } else {
      // Else, multiply by 2024.
      stonesCopy.push(stone * 2024);
    }
  }

  return stonesCopy;
}
