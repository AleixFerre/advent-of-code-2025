export async function day10_2() {
  const path = "day-10/input-big.txt";
  const file = await Bun.file(path).text();

  const machines = file.split("\n").map((p) => p.split(" ").map((s) => s.slice(1, -1)));

  let sum = 0;

  for (const info of machines) {
    const desiredJoltage = info.at(-1)!.split(",").map(Number);

    const buttons = info.slice(1, -1).map((b) => b.split(",").map(Number));

    let i = 0;

    console.log(desiredJoltage);
    let localMinAmount = 0;

    while (i < 10000000n) {
      const naryCombination = getSequence(i, buttons.length);
      const [isCorrect, amount] = checkCombination(naryCombination, desiredJoltage, buttons);

      if (isCorrect) {
        localMinAmount = amount;
        break;
      }

      i++;
    }

    i = 0;

    while (i < 10000000n) {
      const naryCombination = getSequence(i, buttons.length);
      const [isCorrect, amount] = checkCombination(naryCombination.toReversed(), desiredJoltage, buttons);

      if (isCorrect) {
        localMinAmount = Math.min(localMinAmount, amount);
        break;
      }

      i++;
    }

    console.log("Found in", localMinAmount);
    sum += localMinAmount;
  }

  console.log(sum);
}

function checkCombination(naryCombination: number[], desiredJoltage: number[], buttons: number[][]): [boolean, number] {
  let joltage = new Array(desiredJoltage.length).fill(0);

  for (let j = 0; j < naryCombination.length; j++) {
    const buttonAmount = naryCombination[j];
    const button = buttons[j];
    applyButton(joltage, button, buttonAmount);
  }

  if (equal(joltage, desiredJoltage)) {
    const amount = naryCombination.reduce((acc, cur) => acc + cur, 0);
    return [true, amount];
  }
  return [false, 0];
}

function applyButton(joltage: number[], button: number[], buttonAmount: number): void {
  for (const index of button) {
    joltage[index] += buttonAmount;
  }
}

function intPow(base: number, exp: number): number {
  let result = 1;
  for (let i = 0; i < exp; i++) result *= base;
  return result;
}

function getSequence(index: number, length: number): number[] {
  let accumulated = 0;
  let base = 2;

  while (true) {
    const blockSize = intPow(base, length) - intPow(base - 1, length);
    if (index < accumulated + blockSize) break;
    accumulated += blockSize;
    base++;
  }

  let internalIndex = index - accumulated;
  const sequence: number[] = [];
  let hasMaxDigit = false;

  for (let pos = 0; pos < length; pos++) {
    const remaining = length - pos - 1;

    for (let digit = 0; digit < base; digit++) {
      const isMax = digit === base - 1;

      let count: number;
      if (hasMaxDigit || isMax) {
        count = intPow(base, remaining);
      } else {
        count = intPow(base, remaining) - intPow(base - 1, remaining);
      }

      if (internalIndex < count) {
        sequence.push(digit);
        if (isMax) hasMaxDigit = true;
        break;
      }
      internalIndex -= count;
    }
  }

  return sequence;
}

function equal(a: number[], b: number[]): boolean {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}
