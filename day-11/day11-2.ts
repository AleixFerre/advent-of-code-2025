type Racks = Map<string, string[]>;

const visited = new Map<string, number>(); // fsr-aac 

export async function day11_2() {
  const path = "day-11/input-big.txt";
  const file = await Bun.file(path).text();
  const racks: Racks = new Map<string, string[]>(
    (file.split("\n").map(p => p.split(": ")).map(p => [p[0], p[1].split(" ")] as const))
  );


  const fTod = waysOut(racks, "fft", "dac");
  visited.clear();
  console.log("fft-dac", fTod);

  const dToO = waysOut(racks, "dac", "out");
  visited.clear();
  console.log("dac-out", dToO);

  const sToO = waysOut(racks, "svr", "out");
  visited.clear();
  console.log("svr-out", sToO);

  const sToF = waysOut(racks, "svr", "fft");
  console.log("svr-fft", sToF);

  console.log(fTod, dToO, sToF, sToO);
  console.log((fTod * dToO * sToF).toPrecision(23));
}

function waysOut(racks: Racks, current: string, outStr: string): number {
  const currentRacks = racks.get(current)!;

  let n = 0;
  for (const connection of currentRacks) {
    const visitedAmount = visited.get(connection);
    if (visitedAmount !== undefined) {
      n += visitedAmount;
    } else {
      if (connection === outStr) n += 1;
      else if (connection === "out") n = 0;
      else n += waysOut(racks, connection, outStr);
      visited.set(connection, n);
    }
  }
  return n;
}
