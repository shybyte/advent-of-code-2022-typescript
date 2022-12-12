export function solvePart1(input: string): number {
  return sumMapOverLines(input, solvePart1SingleLine);
}

export function solvePart2(input: string): number {
  return sumMapOverLines(input, solvePart2SingleLine);
}

function solvePart1SingleLine(line: string): number {
  return line.length;
}

function solvePart2SingleLine(line: string): number {
  return line.length;
}

function sumMapOverLines(linesString: string, mapCallback: (line: string) => number): number {
  const lines = linesString.trim().split('\n');
  return sum(lines.map(mapCallback));
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
