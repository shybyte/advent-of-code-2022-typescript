export function solvePart1(input: string): number | undefined {
  return findWindowWithUniqueChars(input, 4);
}

export function solvePart2(input: string): number | undefined {
  return findWindowWithUniqueChars(input, 14);
}

export function findWindowWithUniqueChars(input: string, windowLength: number): number | undefined {
  const charArray = Array.from(input);
  const startOfWindowIndex = charArray.findIndex((_c, i) =>
    containsUniqueElement(charArray.slice(i, i + windowLength)),
  );
  return startOfWindowIndex ? startOfWindowIndex + windowLength : undefined;
}

function containsUniqueElement(array: string[]) {
  return new Set(array).size === array.length;
}
