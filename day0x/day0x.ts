export function solvePart1(input: string): number {
  const lines = input.trim().split('\n');
  return sum(lines.map(solvePart1SingleLine));
}

export function solvePart2(input: string): number {
  const lines = input.trim().split('\n');
  return sum(lines.map(solvePart2SingleLine));
}

function solvePart1SingleLine(line: string): number {
  return 0;
}

function solvePart2SingleLine(line: string): number {
  return 0;
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
