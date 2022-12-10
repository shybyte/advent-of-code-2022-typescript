export function solvePart1(input: string): number {
  const map = input
    .trim()
    .split('\n')
    .map((s) => Array.from(s.trim(), (s) => parseInt(s)));

  const maxX = map[0].length - 1;
  const maxY = map.length - 1;

  let maxTreeHeightInCurrentLine = -1;
  const visibleTrees = new Set<string>();

  function collectVisibleTrees(x: number, y: number) {
    if (map[y][x] > maxTreeHeightInCurrentLine) {
      visibleTrees.add(x + '-' + y);
      maxTreeHeightInCurrentLine = map[y][x];
    }
  }

  for (const y of rangeInclusive(0, maxY)) {
    maxTreeHeightInCurrentLine = -1;
    forEach(rangeInclusive(0, maxX), (x) => collectVisibleTrees(x, y));
  }

  for (const y of rangeInclusive(0, maxY)) {
    maxTreeHeightInCurrentLine = -1;
    forEach(rangeInclusive(maxX, 0), (x) => collectVisibleTrees(x, y));
  }

  for (const x of rangeInclusive(0, maxX)) {
    maxTreeHeightInCurrentLine = -1;
    forEach(rangeInclusive(0, maxY), (y) => collectVisibleTrees(x, y));
  }

  for (const x of rangeInclusive(0, maxX)) {
    maxTreeHeightInCurrentLine = -1;
    forEach(rangeInclusive(maxY, 0), (y) => collectVisibleTrees(x, y));
  }

  return visibleTrees.size;
}

export function solvePart2(input: string): number {
  return input.length;
}

function* rangeInclusive(start: number, end: number) {
  if (end > start) {
    for (let x = start; x <= end; x++) {
      yield x;
    }
  } else {
    for (let x = start; x >= end; x--) {
      yield x;
    }
  }
}

function forEach<T>(generator: Generator<T>, f: (x: T) => void) {
  for (const x of generator) {
    f(x);
  }
}
