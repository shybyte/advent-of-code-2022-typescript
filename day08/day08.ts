export function solvePart1(input: string): number {
  const map = parseMap(input);
  const height = map.length;
  const width = map[0].length;

  let maxTreeHeightInCurrentLine = -1;
  const visibleTrees = new Set<string>();

  function collectVisibleTrees(x: number, y: number) {
    if (map[y][x] > maxTreeHeightInCurrentLine) {
      visibleTrees.add(x + '-' + y);
      maxTreeHeightInCurrentLine = map[y][x];
    }
  }

  for (let y = 0; y < height; y++) {
    maxTreeHeightInCurrentLine = -1;
    for (let x = 0; x < width; x++) {
      collectVisibleTrees(x, y);
    }
  }

  for (let y = 0; y < height; y++) {
    maxTreeHeightInCurrentLine = -1;
    for (let x = width - 1; x >= 0; x--) {
      collectVisibleTrees(x, y);
    }
  }

  for (let x = 0; x < width; x++) {
    maxTreeHeightInCurrentLine = -1;
    for (let y = 0; y < height; y++) {
      collectVisibleTrees(x, y);
    }
  }

  for (let x = 0; x < width; x++) {
    maxTreeHeightInCurrentLine = -1;
    for (let y = height - 1; y >= 0; y--) {
      collectVisibleTrees(x, y);
    }
  }

  return visibleTrees.size;
}

export default function parseMap(input: string): number[][] {
  return input
    .trim()
    .split('\n')
    .map((s) => Array.from(s.trim(), (s) => parseInt(s)));
}

export function solvePart2(input: string): number {
  const map = parseMap(input);
  const height = map.length;
  const width = map[0].length;

  let maxScenicScore = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      maxScenicScore = Math.max(maxScenicScore, calculateScenicScore(map, x, y));
    }
  }

  return maxScenicScore;
}

export function calculateScenicScore(map: number[][], x: number, y: number): number {
  const upSteps = treesUntilBlockingTreeOrBorder(map, x, y, 0, -1);
  const leftSteps = treesUntilBlockingTreeOrBorder(map, x, y, -1, 0);
  const rightSteps = treesUntilBlockingTreeOrBorder(map, x, y, 1, 0);
  const downSteps = treesUntilBlockingTreeOrBorder(map, x, y, 0, 1);
  return downSteps * upSteps * leftSteps * rightSteps;
}

export function treesUntilBlockingTreeOrBorder(
  map: number[][],
  xStart: number,
  yStart: number,
  xDelta: number,
  yDelta: number,
): number {
  const originValue = map[yStart][xStart];
  let i = 1;

  while (true) {
    const y = yStart + i * yDelta;
    const x = xStart + i * xDelta;
    const value = map[y]?.[x];

    if (value === undefined) {
      return i - 1;
    }

    if (value >= originValue) {
      return i;
    }

    i += 1;
  }
}
