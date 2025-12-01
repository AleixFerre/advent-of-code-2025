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

  distance(other: Vector2): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  vectorTo(other: Vector2): Vector2 {
    return new Vector2(other.x - this.x, other.y - this.y);
  }

  inverse(): Vector2 {
    return this.multiply(-1);
  }

  multiply(multiplier: number): Vector2 {
    return new Vector2(this.x * multiplier, this.y * multiplier);
  }

  isInBounds(size: number): boolean {
    return this.x >= 0 && this.x < size &&
      this.y >= 0 && this.y < size;
  }

  isEqual(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toString(): string {
    return `(x:${this.x} y:${this.y})`;
  }
}

class ValueSet<T> {
  private map = new Map<string, T>();

  constructor(private toKey: (item: T) => string = JSON.stringify) { }

  add(item: T): this {
    const key = this.toKey(item);
    this.map.set(key, item);
    return this;
  }

  addMultiple(values: T[]): this {
    values.forEach(v => this.add(v));
    return this;
  }

  join(otherSet: ValueSet<T>): this {
    for (const item of otherSet) {
      this.add(item);
    }
    return this;
  }

  has(item: T): boolean {
    const key = this.toKey(item);
    return this.map.has(key);
  }

  delete(item: T): boolean {
    const key = this.toKey(item);
    return this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }

  values(): IterableIterator<T> {
    return this.map.values();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  toString(): string {
    return Array.from(this.map.values()).map(this.toKey).join(', ');
  }
}

export async function day8_2() {
  const path = "day-8/input.txt";
  const file = await Bun.file(path).text();

  const values = file.split("\n").map(p => p.split(""));
  const antennas: Map<string, Vector2[]> = new Map();

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      const antennaName = values[i][j];
      if (antennaName === '.') continue;

      const currentPos = antennas.get(antennaName);
      const newPos: Vector2 = new Vector2(i, j);
      antennas.set(antennaName, currentPos ? [...currentPos, newPos] : [newPos]);
    }
  }

  const positions: ValueSet<Vector2> = new ValueSet();

  for (const antenna of antennas.values()) {
    for (const pos1 of antenna) {
      for (const pos2 of antenna) {
        if (pos1.isEqual(pos2)) continue;
        const antinodes = calculateAntinodes(pos1, pos2, values.length);
        positions.join(antinodes);
      }
    }
  }

  console.log(positions.size);
}

function calculateAntinodes(pos1: Vector2, pos2: Vector2, size: number): ValueSet<Vector2> {
  const AB = pos1.vectorTo(pos2);

  const positions: ValueSet<Vector2> = new ValueSet();

  [-1, 1].forEach(multiplier => {
    let currentMultiplier = multiplier;
    while (currentMultiplier < size) { // Just in case
      const newPos = pos2.add(AB.multiply(currentMultiplier));
      if (!newPos.isInBounds(size)) break;
      positions.add(newPos);
      currentMultiplier += multiplier;
    }
  });

  return positions;
}
