type Racks = Map<string, string[]>;

const visited = new Map<string, number>();

export async function day11_2() {
  const path = "day-11/input.txt";
  const file = await Bun.file(path).text();
  const racks: Racks = new Map<string, string[]>(
    (file.split("\n").map(p => p.split(": ")).map(p => [p[0], p[1].split(" ")] as const))
  );

  const ways = waysOut(racks, "svr", false, false, "svr");

  console.log(visited);

  console.log(ways);
}

function waysOut(racks: Racks, current: string, fft: boolean, dac: boolean, total: string): number {
  const currentRacks = racks.get(current)!;

  const hasFFT = fft || currentRacks.includes("fft");
  const hasDAC = dac || currentRacks.includes("dac");

  let n = 0;
  for (const connection of currentRacks) {
    const newTotal = total + connection;
    const visitedAmount = visited.get(newTotal);
    if (visitedAmount) {
      n += visitedAmount;
    } else {
      const sum = getSum(connection, hasFFT, hasDAC, racks, newTotal);
      visited.set(newTotal, sum);
      n += sum;
    }
  }

  return n;
}

function getSum(connection: string, hasFFT: boolean, hasDAC: boolean, racks: Racks, total: string): number {
  if (connection === "out") {
    return hasDAC && hasFFT ? 1 : 0;
  } else {
    return waysOut(racks, connection, hasFFT, hasDAC, total);
  }
}