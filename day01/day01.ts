export function getMaxElfCalories(input: string): number {
  return Math.max(...getCalorieSumsOfElves(input));
}

export function getSumOfTopThreeElves(input: string): number {
  const calorieSumsOfElves = getCalorieSumsOfElves(input);
  calorieSumsOfElves.sort((a, b) => b - a);
  return sum(calorieSumsOfElves.slice(0, 3));
}

function getCalorieSumsOfElves(input: string): number[] {
  return input
    .trim()
    .split('\n\n')
    .map((caloriesStringOfOneElf) => sum(parseNewlineSeparatedNumbers(caloriesStringOfOneElf)));
}

function parseNewlineSeparatedNumbers(s: string): number[] {
  return s.split('\n').map(parseFloat);
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
