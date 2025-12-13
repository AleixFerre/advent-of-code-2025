export async function day10() {
  const path = "day-10/input-big.txt";
  const file = await Bun.file(path).text();

  const machines = file.split("\n").map((p) => p.split(" ").map((s) => s.slice(1, -1)));

  let sum = 0;

  for (const info of machines) {
    const lightResult = info[0];
    const buttons = info.slice(1, -1).map((b) => b.split(",").map(Number));

    const nCombinations = 2 ** buttons.length;

    let min = buttons.length + 1; // Qualsevol combinació serà més petita que totes +1

    // No hi ha cap input que demani 0 botons, començem per 1
    for (let i = 1; i < nCombinations; i++) {
      const lights = ".".repeat(lightResult.length).split("");

      // Mirem tots els numeros binaris des de 1 fins el numero, per mirar totes les combinacions de on-off
      const binaryIndexes = toBinary(i, buttons.length);
      const buttonsToActivate = binaryIndexes
        .toReversed()
        .reduce((acc, cur, index) => (cur ? [...acc, buttons[index]] : acc), [] as number[][]);

      for (const button of buttonsToActivate) {
        for (const lightIndex of button) {
          lights[lightIndex] = flip(lights[lightIndex]);
        }
      }

      if (lights.join("") === lightResult) {
        const nButtons = buttonsToActivate.length;
        if (nButtons < min) min = nButtons;
      }
    }
    sum += min;
  }

  console.log(sum);
}

function toBinary(n: number, length: number): number[] {
  return [...n.toString(2).padStart(length)].map(Number);
}

function flip(str: string): string {
  if (str === ".") return "#";
  else return ".";
}
