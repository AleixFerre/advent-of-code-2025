export async function day7() {
  const path = "day-7/input.txt";
  const file = await Bun.file(path).text();

  const matrix = file.split('\n').map(p => p.split(""));
  const initialPos = matrix[0].indexOf("S");

  let sum = 0;
  const beams = new Set([initialPos]);

  for (let i = 1; i < matrix.length; i++) {
    for (const beam of beams) {
      if (matrix[i]?.[beam] === '^') {
        beams.add(beam - 1);
        beams.add(beam + 1);
        beams.delete(beam);
        sum++;
      }
    }
  }

  console.log(sum);
}