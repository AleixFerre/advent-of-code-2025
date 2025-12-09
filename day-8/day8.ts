interface Distance {
  from: number;
  to: number;
  distance: number;
}

export async function day8() {
  const path = "day-8/input-big.txt";
  const file = await Bun.file(path).text();

  const points = file.split('\n').map(p => p.split(",").map(s => parseInt(s)));

  const allDistances: Distance[] = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      allDistances.push({
        from: i,
        to: j,
        distance: distance(points[i], points[j]),
      });
    }
  }

  const distances = allDistances.toSorted((a, b) => a.distance - b.distance).slice(0, 1000);

  const circuits: Set<number>[] = points.map((_, i) => new Set([i]));

  for (const distance of distances) {
    const fromCircuitIndex = circuits.findIndex(c => c?.has(distance.from));
    const toCircuitIndex = circuits.findIndex(c => c?.has(distance.to));

    if (fromCircuitIndex === toCircuitIndex) continue;

    // Ajuntem el circuit de from i to
    circuits[fromCircuitIndex] = circuits[fromCircuitIndex].union(circuits[toCircuitIndex]);
    delete circuits[toCircuitIndex];
  }


  const sizesMult = circuits.toSorted((a, b) => b.size - a.size).slice(0, 3).reduce((acc, curr) => acc * curr.size, 1);
  console.log(sizesMult);
}

function distance(pos1: number[], pos2: number[]): number {
  const x = pos1[0] - pos2[0];
  const y = pos1[1] - pos2[1];
  const z = pos1[2] - pos2[2];
  return x * x + y * y + z * z; // We can simplify the sqrt
}