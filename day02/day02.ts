export function getScore(input: string): number {
  const lines = input.trim().split('\n');
  return sum(lines.map(getScoreOfOneLine));
}

export function getScore2(input: string): number {
  const lines = input.trim().split('\n');
  return sum(lines.map(getScoreOfOneLine2));
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

const ShapeByChar: Dict<Shape> = {
  A: Shape.Rock,
  B: Shape.Paper,
  C: Shape.Scissors,
  X: Shape.Rock,
  Y: Shape.Paper,
  Z: Shape.Scissors,
};

function getOutcome(yourShape: Shape, otherShape: Shape) {
  if (yourShape === otherShape) {
    return Outcome.Draw;
  }
  switch (yourShape) {
    case Shape.Paper:
      return otherShape == Shape.Rock ? Outcome.Win : Outcome.Lost;
    case Shape.Scissors:
      return otherShape == Shape.Paper ? Outcome.Win : Outcome.Lost;
    case Shape.Rock:
      return otherShape == Shape.Scissors ? Outcome.Win : Outcome.Lost;
  }
}

function getScoreOfOneLine(line: string): number {
  const yourShape = ShapeByChar[line[2]];
  const otherShape = ShapeByChar[line[0]];
  if (!yourShape || !otherShape) {
    throw new Error(`Invalid line "${line}"`);
  }
  return yourShape + getOutcome(yourShape, otherShape);
}

const DesiredOutcomeByChar: Dict<Outcome> = {
  X: Outcome.Lost,
  Y: Outcome.Draw,
  Z: Outcome.Win,
};

function getScoreOfOneLine2(line: string): number {
  const otherShape = ShapeByChar[line[0]];
  const yourDesiredOutcome = DesiredOutcomeByChar[line[2]];
  if (otherShape === undefined || yourDesiredOutcome === undefined) {
    throw new Error(`Invalid line "${line}"`);
  }
  return getYourShapeForDesiredOutcome(otherShape, yourDesiredOutcome) + yourDesiredOutcome;
}

function getYourShapeForDesiredOutcome(otherShape: Shape, desiredOutcome: Outcome): Shape {
  if (desiredOutcome === Outcome.Draw) {
    return otherShape;
  }
  switch (otherShape) {
    case Shape.Paper:
      return desiredOutcome == Outcome.Win ? Shape.Scissors : Shape.Rock;
    case Shape.Scissors:
      return desiredOutcome == Outcome.Win ? Shape.Rock : Shape.Paper;
    case Shape.Rock:
      return desiredOutcome == Outcome.Win ? Shape.Paper : Shape.Scissors;
  }
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
