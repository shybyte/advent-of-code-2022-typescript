export function solvePart1(input: string): number {
  const lines = input.trim().split('\n');
  const lineValues = lines.map(solvePart1SingleLine);
  console.log('lineValues:', lineValues);
  return sum(lineValues);
}

export function solvePart2(input: string): number {
  const lines = input.trim().split('\n');
  return sum(lines.map(solvePart2SingleLine));
}

function solvePart1SingleLine(line: string): number {
  const half1 = line.slice(0, line.length / 2);
  const half2 = line.slice(line.length / 2);
  const duplicateChar = Array.from(half2).find((char) => half1.includes(char));
  if (!duplicateChar) {
    throw new Error(`Can't find a duplicate char in "${line}"`);
  }
  console.log('duplicateChar:', line, duplicateChar);
  return getCharValue(duplicateChar);
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

function solvePart2SingleLine(_line: string): number {
  return 0;
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
