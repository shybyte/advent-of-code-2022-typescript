export function solvePart1(input: string): number {
  const lines = input.trim().split('\n');
  return sum(lines.map(solvePart1SingleLine));
}

export function solvePart2(input: string): number {
  const lines = input.trim().split('\n');
  const groups = partition(lines, 3);
  return sum(groups.map(findCommonCharValue));
}

function solvePart1SingleLine(line: string): number {
  const half1 = line.slice(0, line.length / 2);
  const half2 = line.slice(line.length / 2);
  return findCommonCharValue([half1, half2]);
}

const charCodeOfa = 'a'.charCodeAt(0); // 97
const charCodeOfA = 'A'.charCodeAt(0); // 65

function getCharValue(char: string) {
  const charCode = char.charCodeAt(0);
  // if is lower case
  if (charCode >= charCodeOfa) {
    return charCode - charCodeOfa + 1;
  } else {
    return charCode - charCodeOfA + 27;
  }
}

function findCommonCharValue(lines: string[]): number {
  const duplicateChar = Array.from(lines[0]).find((char) => lines.every((line) => line.includes(char)));
  if (!duplicateChar) {
    throw new Error(`Can't find a duplicate char in "${lines.toString()}"`);
  }
  return getCharValue(duplicateChar);
}

function partition<T>(array: T[], partitionLength: number): T[][] {
  return Array.from(Array(Math.floor(array.length / partitionLength)), (_val, i) =>
    array.slice(i * partitionLength, (i + 1) * partitionLength),
  );
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
