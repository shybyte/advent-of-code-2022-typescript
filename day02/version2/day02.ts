export function getScore1(input: string): number {
  return sumLines(input, ScoreByLine1);
}

export function getScore2(input: string): number {
  return sumLines(input, ScoreByLine2);
}

function sumLines(input: string, scoreByLineContent: Dict<number>) {
  return sum(
    input
      .trim()
      .split('\n')
      .map((line) => scoreByLineContent[line.trim()] ?? NaN),
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

const ScoreByLine1: Dict<number> = {
  // A = Rock
  'A X': Outcome.Draw + Shape.Rock,
  'A Y': Outcome.Win + Shape.Paper,
  'A Z': Outcome.Lost + Shape.Scissors,
  // B = Paper
  'B X': Outcome.Lost + Shape.Rock,
  'B Y': Outcome.Draw + Shape.Paper,
  'B Z': Outcome.Win + Shape.Scissors,
  // C = Scissors
  'C X': Outcome.Win + Shape.Rock,
  'C Y': Outcome.Lost + Shape.Paper,
  'C Z': Outcome.Draw + Shape.Scissors,
};

const ScoreByLine2: Dict<number> = {
  // A = Rock
  'A X': Outcome.Lost + Shape.Scissors,
  'A Y': Outcome.Draw + Shape.Rock,
  'A Z': Outcome.Win + Shape.Paper,
  // B = Paper
  'B X': Outcome.Lost + Shape.Rock,
  'B Y': Outcome.Draw + Shape.Paper,
  'B Z': Outcome.Win + Shape.Scissors,
  // C = Scissors
  'C X': Outcome.Lost + Shape.Paper,
  'C Y': Outcome.Draw + Shape.Scissors,
  'C Z': Outcome.Win + Shape.Rock,
};

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
