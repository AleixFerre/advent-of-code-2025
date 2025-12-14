type Racks = Map<string, string[]>;

let nAmount = 0;

export async function day11() {
  const path = "day-11/input-big.txt";
  const file = await Bun.file(path).text();
  const racks: Racks = new Map<string, string[]>(
    (file.split("\n").map(p => p.split(": ")).map(p => [p[0], p[1].split(" ")] as const))
  );

  const ways = waysOut(racks, "you");
  console.log(ways);
}

function waysOut(racks: Racks, current: string): number {
  const currentRacks = racks.get(current)!;
  let n = 0;
  for (const connection of currentRacks) {
    nAmount++;
    if (connection === "out") n += 1;
    else n += waysOut(racks, connection);
  }
  return n;
}
