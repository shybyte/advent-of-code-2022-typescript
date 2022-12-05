type Range = [number, number];
type Assignment = [Range, Range];

export function solvePart1(input: string): number {
  return sumMapOverLines(input, solvePart1SingleLine);
}

export function solvePart2(input: string): number {
  return sumMapOverLines(input, solvePart2SingleLine);
}

function solvePart1SingleLine(line: string): number {
  const assignments = parseAssignments(line);
  return contains(assignments[0], assignments[1]) || contains(assignments[1], assignments[0]) ? 1 : 0;
}

/**
 * @return whether range1 contains range2
 */
function contains(range1: Range, range2: Range) {
  return range2[0] >= range1[0] && range2[1] <= range1[1];
}

function solvePart2SingleLine(line: string): number {
  const assignments = parseAssignments(line);
  return overlaps(assignments[0], assignments[1]) ? 1 : 0;
}

function overlaps(range1: Range, range2: Range) {
  return !(range2[0] > range1[1] || range1[0] > range2[1]);
}

function parseAssignments(line: string): Assignment {
  return line
    .split(',')
    .map((assignmentString) => assignmentString.split('-').map((it) => parseInt(it)) as Range) as Assignment;
}

function sumMapOverLines(linesString: string, mapCallback: (line: string) => number): number {
  const lines = linesString.trim().split('\n');
  return sum(lines.map(mapCallback));
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
