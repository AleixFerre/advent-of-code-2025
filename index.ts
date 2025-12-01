import { day1 } from "./day-1/day1";
import { day1_2 } from "./day-1/day1-2";
import { day10 } from "./day-10/day10";
import { day10_2 } from "./day-10/day10-2";
import { day11 } from "./day-11/day11";
import { day11_2 } from "./day-11/day11-2";
import { day12 } from "./day-12/day12";
import { day12_2 } from "./day-12/day12-2";
import { day13 } from "./day-13/day13";
import { day13_2 } from "./day-13/day13-2";
import { day14 } from "./day-14/day14";
import { day14_2 } from "./day-14/day14-2";
import { day15 } from "./day-15/day15";
import { day15_2 } from "./day-15/day15-2";
import { day2 } from "./day-2/day2";
import { day2_2_optimized } from "./day-2/day2-2_optimized";
import { day3 } from "./day-3/day3";
import { day3_2 } from "./day-3/day3-2";
import { day4 } from "./day-4/day4";
import { day4_2 } from "./day-4/day4-2";
import { day5 } from "./day-5/day5";
import { day5_2 } from "./day-5/day5-2";
import { day6 } from "./day-6/day6";
import { day6_2_optimized } from "./day-6/day6-2_optimized";
import { day7 } from "./day-7/day7";
import { day7_2 } from "./day-7/day7-2";
import { day8 } from "./day-8/day8";
import { day8_2 } from "./day-8/day8-2";
import { day9 } from "./day-9/day9";
import { day9_2 } from "./day-9/day9-2";

const daysFunctions: Function[][] = [
  [day1, day1_2],
  [day2, day2_2_optimized],
  [day3, day3_2],
  [day4, day4_2],
  [day5, day5_2],
  [day6, day6_2_optimized],
  [day7, day7_2],
  [day8, day8_2],
  [day9, day9_2],
  [day10, day10_2],
  [day11, day11_2],
  [day12, day12_2],
  [day13, day13_2],
  [day14, day14_2],
  [day15, day15_2],
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
