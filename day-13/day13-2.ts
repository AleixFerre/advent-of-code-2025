interface Config {
  a: [number, number];
  b: [number, number];
  c: [number, number];
};

export async function day13_2() {
  const path = "day-13/input.txt";
  const file = await Bun.file(path).text();

  const configurations: Config[] = file.split('\n\n').map(p => p.split('\n')).map(p => ({
    a: p[0].slice(10).split(', ').map(coord => parseInt(coord.slice(1))) as [number, number],
    b: p[1].slice(10).split(', ').map(coord => parseInt(coord.slice(1))) as [number, number],
    c: p[2].slice(7).split(', ').map(coord => 10000000000000 + parseInt(coord.slice(2))) as [number, number],
  }));

  let total = 0;

  for (const config of configurations) {
    total += findFewestTokensCombination(config);
  }

  console.log(total);
}

function findFewestTokensCombination(i: Config): number {
  const numerator = i.a[1] * i.c[0] - i.a[0] * i.c[1];
  const denominator = i.a[1] * i.b[0] - i.a[0] * i.b[1];

  if (denominator === 0) return 0;

  const resultB = numerator / denominator;
  const resultA = (i.c[0] - i.b[0] * resultB) / i.a[0];

  return (resultA % 1 !== 0 || resultB % 1 !== 0) ? 0 : resultA * 3 + resultB;
}
