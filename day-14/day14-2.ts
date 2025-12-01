class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  mult(times: number): Vector2 {
    return new Vector2(this.x * times, this.y * times);
  }

  limit(size: Vector2): Vector2 {
    const topBoundPos = new Vector2(
      this.x % size.x,
      this.y % size.y,
    );
    const botBoundPos = new Vector2(
      topBoundPos.x < 0 ? size.x + topBoundPos.x : topBoundPos.x,
      topBoundPos.y < 0 ? size.y + topBoundPos.y : topBoundPos.y
    );
    return botBoundPos;
  }

  toString(): string {
    return `(x: ${this.x}, y: ${this.y})`;
  }
}

import * as canvas from "canvas";

export async function day14_2() {
  const path = "day-14/input.txt";
  const file = await Bun.file(path).text();

  const robots = file.split('\n').map(p => p.split(' ').map(
    p => p.slice(2).split(',').map(n => parseInt(n))
  ).map(p => new Vector2(p[0], p[1])) as [Vector2, Vector2]);

  const mazeSize: Vector2 = new Vector2(101, 103);
  // const mazeSize: Vector2 = new Vector2(11, 7);

  const c = canvas.createCanvas(mazeSize.x, mazeSize.y);
  const ctx = c.getContext('2d');

  for (let i = 0; i < 7052; i++) {
    const finalMatrix = [...Array(mazeSize.y)].map(() => Array(mazeSize.x).fill(0));
    for (const robot of robots) {
      const finalPos = moveRobot(robot, 1, mazeSize);
      robot[0] = finalPos;
      finalMatrix[finalPos.y][finalPos.x]++;
    }
    drawMatrix(finalMatrix, c, ctx, `${i + 1}`);
  }
}

function moveRobot(robot: [Vector2, Vector2], times: number, size: Vector2): Vector2 {
  return robot[0].add(robot[1].mult(times)).limit(size);
}

function drawMatrix(matrix: number[][], canvas: canvas.Canvas, ctx: canvas.CanvasRenderingContext2D, name: string) {
  // Draw the matrix
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      ctx.fillStyle = cell > 0 ? "black" : "white";
      ctx.fillRect(x, y, 1, 1);
    });
  });

  // Save the canvas to an image
  const buffer: Buffer = canvas.toBuffer("image/png");
  Bun.write(`day-14/output/${name}.png`, buffer.buffer).then(() => {
    console.log("Writed", name);
  });
}