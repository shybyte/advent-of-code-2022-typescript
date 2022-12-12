interface Pos {
  x: number;
  y: number;
}

type Direction = 'U' | 'D' | 'R' | 'L';
interface Motion {
  direction: Direction;
  steps: number;
}

type Rope = Pos[]; //  Head is at index 0

export function solve(input: string, knots = 2): number {
  const motions = input
    .trim()
    .split('\n')
    .map((line): Motion => {
      const [direction, stepsString] = line.split(' ');
      return { direction: direction as Direction, steps: parseInt(stepsString) };
    });

  const visitedPositions = new Set<string>();
  const rope = Array.from({ length: knots }, () => ({ x: 0, y: 0 }));

  for (const motion of motions) {
    for (let i = 0; i < motion.steps; i++) {
      simulateMotionStep(rope, motion.direction);
      const tail = rope[rope.length - 1];
      visitedPositions.add(tail.x + '-' + tail.y);
    }
  }

  return visitedPositions.size;
}

const POS_DELTA_BY_DIRECTION: Record<Direction, Pos> = {
  D: { x: 0, y: 1 },
  U: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

function addPos(pos1: Pos, pos2: Pos): Pos {
  return { x: pos1.x + pos2.x, y: pos1.y + pos2.y };
}

function isEqual(pos1: Pos, pos2: Pos) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function simulateMotionStep(/*mut*/ rope: Rope, direction: Direction) {
  rope[0] = addPos(rope[0], POS_DELTA_BY_DIRECTION[direction]);

  for (let i = 1; i < rope.length; i++) {
    const knot = rope[i];
    const prevKnot = rope[i - 1];

    const moveCloserToPrevKnotStep: Pos = {
      x: Math.sign(prevKnot.x - knot.x),
      y: Math.sign(prevKnot.y - knot.y),
    };
    const potentialNextPos = addPos(knot, moveCloserToPrevKnotStep);
    if (!isEqual(potentialNextPos, prevKnot)) {
      rope[i] = potentialNextPos;
    }
  }
}
