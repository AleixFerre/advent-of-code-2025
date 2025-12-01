export async function day5() {
  const path = "day-5/input.txt";
  const file = await Bun.file(path).text();

  const parts = file.split("\n\n")

  const rules = parts[0].split("\n").map(p => p.split("|").map(p => parseInt(p)));
  const lists = parts[1].split("\n").map(p => p.split(",").map(p => parseInt(p)));

  let total = 0;

  for (const list of lists) {
    if (isFollowingAllRules(list, rules)) {
      total += list[Math.floor(list.length / 2)];
    }
  }

  console.log(total);
}

function isFollowingAllRules(list: number[], rules: number[][]): boolean {
  for (const rule of rules) {
    if (!checkRule(list, rule)) return false;
  }
  return true;
}

function checkRule(list: number[], rule: number[]): boolean {
  const hasAppeared = [false, false];
  for (const num of list) {
    if (num === rule[0]) {
      if (hasAppeared[1]) return false;
      hasAppeared[0] = true;
    }
    if (num === rule[1]) {
      if (hasAppeared[0]) return true; // If you already found the pair, stop searching
      hasAppeared[1] = true;
    }
  }
  return true;
}