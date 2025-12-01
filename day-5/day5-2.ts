interface RuleResult {
  hasBeenApplied: boolean,
  list: number[]
};

export async function day5_2() {
  const path = "day-5/input.txt";
  const file = await Bun.file(path).text();

  const parts = file.split("\n\n")

  const rules = parts[0].split("\n").map(p => p.split("|").map(p => parseInt(p)));
  const lists = parts[1].split("\n").map(p => p.split(",").map(p => parseInt(p)));

  let total = 0;

  for (const list of lists) {
    const info = fixList(list, rules);

    if (info.hasBeenApplied) {
      total += info.list[Math.floor(info.list.length / 2)];
    }
  }

  console.log(total);
}

function fixList(list: number[], rules: number[][]): RuleResult {
  let hasBeenApplied = false;

  for (const rule of rules) {
    const info = applyRule(list, rule);

    if (info.hasBeenApplied) {
      list = info.list;
      hasBeenApplied = true;
    }
  }

  // If the list was not modified, return the list
  if (!hasBeenApplied) {
    return { hasBeenApplied, list };
  }

  // If the first pass does not fix the array completely, try again
  return { hasBeenApplied, list: fixList(list, rules).list };
}

function applyRule(list: number[], rule: number[]): RuleResult {
  const appearanceIndex = [-1, -1];
  for (let i = 0; i < list.length; i++) {
    if (list[i] === rule[0]) {
      // If we find a fixable pair, swap the indexes
      if (appearanceIndex[1] !== -1) {
        return { hasBeenApplied: true, list: swapIndexes(list, i, appearanceIndex[1]) };
      }
      appearanceIndex[0] = i;
    }
    if (list[i] === rule[1]) {
      // Correct pair
      if (appearanceIndex[0] !== -1) {
        return { hasBeenApplied: false, list };
      }
      appearanceIndex[1] = i;
    }
  }
  // We didn't found any fixable pairs
  return { hasBeenApplied: false, list };
}

function swapIndexes(list: number[], i: number, j: number): number[] {
  const listCopy = [...list];
  listCopy[i] = list[j];
  listCopy[j] = list[i];
  return listCopy;
}
