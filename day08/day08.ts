export function solvePart1(input: string): number {
  const map = input
    .trim()
    .split('\n')
    .map((s) => Array.from(s.trim(), (s) => parseInt(s)));
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

export function solvePart2(input: string): number {
  return input.length;
}
