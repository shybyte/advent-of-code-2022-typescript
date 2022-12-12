interface Pos {
  x: number;
  y: number;
}

type Direction = 'U' | 'D' | 'R' | 'L';
interface Motion {
  direction: Direction;
  steps: number;
}

interface World {
  head: Pos;
  tail: Pos;
}

export function solvePart1(input: string): number {
  const motions = input
    .trim()
    .split('\n')
    .map((line): Motion => {
      const [direction, stepsString] = line.split(' ');
      return { direction: direction as Direction, steps: parseInt(stepsString) };
    });

  const visitedPositions = new Set<string>();
  let world: World = { head: { x: 0, y: 0 }, tail: { x: 0, y: 0 } };

  for (const motion of motions) {
    for (let i = 0; i < motion.steps; i++) {
      world = simulateMotionStep(world, motion.direction);
      visitedPositions.add(world.tail.x + '-' + world.tail.y);
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

function simulateMotionStep(world: World, direction: Direction): World {
  const newHead = addPos(world.head, POS_DELTA_BY_DIRECTION[direction]);
  const tailToHeadMoveStep: Pos = { x: Math.sign(newHead.x - world.tail.x), y: Math.sign(newHead.y - world.tail.y) };
  const potentialNextTailPos = addPos(world.tail, tailToHeadMoveStep);
  const newTail = isEqual(potentialNextTailPos, newHead) ? world.tail : potentialNextTailPos;
  return { head: newHead, tail: newTail };
}

export function solvePart2(input: string): number {
  return input.length;
}
