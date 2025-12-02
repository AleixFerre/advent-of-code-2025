import { day1 } from "./day-1/day1";
import { day1_2 } from "./day-1/day1-2";
import { day1_simple } from "./day-1/day1-simple";

const daysFunctions: Function[][] = [
  [day1, day1_simple, day1_2],
];

const dayStr = Bun.env.DAY!;
const desiredDay = parseInt(dayStr) - 1;

const TOTAL_TIME_LABEL = "Total time to complete";
const DAY_TIMESTAMP = 'Day Duration';
console.time(TOTAL_TIME_LABEL);

if (0 <= desiredDay && desiredDay < daysFunctions.length) {
  await computeDay(desiredDay);
} else {
  await computeAllDays();
}
console.timeEnd(TOTAL_TIME_LABEL);

async function computeAllDays() {
  console.log("Computing all days");

  for (let i = 0; i < daysFunctions.length; i++) {
    console.log(`Results of Day ${i + 1}`);
    await computeDay(i);
  }
}

async function computeDay(index: number) {
  console.log(`\n--- Results of Day ${index + 1} --- \n`);
  for (let i = 0; i < daysFunctions[index].length; i++) {
    console.log(`-- Calculating problem ${i + 1} --`);
    console.time(DAY_TIMESTAMP);
    await daysFunctions[index][i]();
    console.timeEnd(DAY_TIMESTAMP);
  }
}
