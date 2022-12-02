export function getScore1(input: string): number {
  return sumLines(input, getScoreByLine1);
}

export function getScore2(input: string): number {
  return sumLines(input, getScoreByLine2);
}

function sumLines(input: string, getScoreByLineContent: (line: string) => number) {
  return sum(
    input
      .trim()
      .split('\n')
      .map((line) => getScoreByLineContent(line) ?? NaN),
  );
}

enum Shape {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

enum Outcome {
  Lost = 0,
  Draw = 3,
  Win = 6,
}

function getScoreByLine1(line: string) {
  switch (line) {
    case 'A X':
      return Outcome.Draw + Shape.Rock;
    case 'A Y':
      return Outcome.Win + Shape.Paper;
    case 'A Z':
      return Outcome.Lost + Shape.Scissors;
    case 'B X':
      return Outcome.Lost + Shape.Rock;
    case 'B Y':
      return Outcome.Draw + Shape.Paper;
    case 'B Z':
      return Outcome.Win + Shape.Scissors;
    case 'C X':
      return Outcome.Win + Shape.Rock;
    case 'C Y':
      return Outcome.Lost + Shape.Paper;
    case 'C Z':
      return Outcome.Draw + Shape.Scissors;
    default:
      throw new Error(`Invalid input line "${line}"`);
  }
}

function getScoreByLine2(line: string) {
  switch (line) {
    case 'A X':
      return Outcome.Lost + Shape.Scissors;
    case 'A Y':
      return Outcome.Draw + Shape.Rock;
    case 'A Z':
      return Outcome.Win + Shape.Paper;
    case 'B X':
      return Outcome.Lost + Shape.Rock;
    case 'B Y':
      return Outcome.Draw + Shape.Paper;
    case 'B Z':
      return Outcome.Win + Shape.Scissors;
    case 'C X':
      return Outcome.Lost + Shape.Paper;
    case 'C Y':
      return Outcome.Draw + Shape.Scissors;
    case 'C Z':
      return Outcome.Win + Shape.Rock;
    default:
      throw new Error(`Invalid input line "${line}"`);
  }
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
