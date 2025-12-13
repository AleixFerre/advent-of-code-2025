import solver from "javascript-lp-solver";

type Buttons = number[][];
type Joltage = number[];
type ColumnEntry = { idx: number; count: number };

export async function day10_2() {
  const path = "day-10/input-big.txt";
  const file = await Bun.file(path).text();

  const machines = file
    .split("\n")
    .map((p) => p.split(" ").map((s) => s.slice(1, -1)));

  let sum = 0;

  for (const info of machines) {
    const desiredJoltage = info.at(-1)!.split(",").map(Number);

    const buttons = info.slice(1, -1).map((b) => b.split(",").map(Number));

    const solution = solveMinButtons(buttons, desiredJoltage);
    const nPresses = solution?.reduce((acc, cur) => acc + cur, 0);
    if (!nPresses) {
      console.log("A");
    } else {
      sum += nPresses;
    }
  }

  console.log(sum);
}

export function solveMinButtons(
  buttons: Buttons,
  target: Joltage
): number[] | null {
  const n = target.length;
  const m = buttons.length;

  const columnRows: ColumnEntry[][] = buttons.map((button) => {
    const counts = new Map<number, number>();
    for (const idx of button) {
      counts.set(idx, (counts.get(idx) ?? 0) + 1);
    }
    return [...counts.entries()].map(([idx, count]) => ({ idx, count }));
  });

  const constraints: Record<string, { equal: number }> = {};
  for (let i = 0; i < n; i++) {
    constraints[`r${i}`] = { equal: target[i] };
  }

  const variables: Record<string, Record<string, number>> = {};
  const ints: Record<string, 1> = {};

  for (let j = 0; j < m; j++) {
    const name = `b${j}`;
    const contrib: Record<string, number> = {};
    for (const { idx, count } of columnRows[j]) {
      const key = `r${idx}`;
      contrib[key] = (contrib[key] ?? 0) + count;
    }
    variables[name] = { presses: 1, ...contrib };
    ints[name] = 1;
  }

  const model = {
    optimize: "presses",
    opType: "min",
    constraints,
    variables,
    ints,
  };

  const result = solver.Solve(model);
  if (!result.feasible) return null;

  return buttons.map((_, j) => {
    const value = result[`b${j}`];
    return typeof value === "number" ? value : 0;
  });
}
