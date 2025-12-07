type Beams = { [key: number]: number }

export async function day7_2() {
  const path = "day-7/input-big.txt";
  const file = await Bun.file(path).text();

  const matrix = file.split('\n').map(p => p.split(""));
  const initialPos = matrix[0].indexOf("S");

  let beams: Beams = { [initialPos]: 1 };

  for (let i = 1; i < matrix.length; i++) {
    const entries = Object.entries(beams);
    for (const [beam, amount] of entries) {
      const beamNum = parseInt(beam);
      if (matrix[i]?.[beamNum] === '^') {
        upsertBeam(beams, beamNum - 1, amount);
        upsertBeam(beams, beamNum + 1, amount);
        subdrop(beams, beamNum, amount);
      }
    }
  }

  const sum = Object.entries(beams).reduce((acc, curr) => acc += curr[1], 0);
  console.log(sum);
}

// Substract and remove if 0
function subdrop(beams: Beams, beam: number, amount: number): void {
  beams[beam] -= amount;

  if (beams[beam] <= 0) {
    delete beams[beam];
  }
}

// Add and create if it's not there yet
function upsertBeam(beams: Beams, beam: number, amount: number): void {
  if (!beams[beam]) {
    beams[beam] = amount;
  } else {
    beams[beam] += amount;
  }
}

// M'he inventat el nom de les funcions però ta guapo eh