type Stack = string[];
type Instruction = [number, number, number];

export function solvePart1(input: string): string {
  return solve(input, ([amount, from, to], stacks) => {
    for (let i = 0; i < amount; i++) {
      stacks[to].push(stacks[from].pop()!);
    }
  });
}

export function solvePart2(input: string): string {
  return solve(input, ([amount, from, to], stacks) => {
    const movingChars = stacks[from].splice(stacks[from].length - amount, amount);
    stacks[to].push(...movingChars);
  });
}

export function solve(input: string, executeInstruction: (instruction: Instruction, stacks: Stack[]) => void): string {
  const [stacks, instructions] = parseInput(input);

  for (const instruction of instructions) {
    executeInstruction(instruction, stacks);
  }

  return stacks.map((stack) => stack[stack.length - 1]).join('');
}

function parseInput(input: string): [Stack[], Instruction[]] {
  const [stacksString, instructionsString] = input.split('\n\n');

  const stacksLines = stacksString.split('\n');
  stacksLines.reverse();
  const stackNumber = Math.floor(stacksLines[0].length / 3);
  const stacks: Stack[] = Array.from({ length: stackNumber }, () => []);
  for (const stacksLine of stacksLines.slice(1)) {
    for (let stackIndex = 0; stackIndex < stackNumber; stackIndex++) {
      const char = stacksLine[stackIndex * 4 + 1];
      if (char && char !== ' ') {
        stacks[stackIndex].push(char);
      }
    }
  }

  const instructions: Instruction[] = instructionsString
    .trim()
    .split('\n')
    .map((instructionString) => [...instructionString.matchAll(/\d+/g)])
    .map((instructionMatchArray) => {
      const instruction = instructionMatchArray.map((x) => parseInt(x as any as string)) as Instruction;
      return [instruction[0], instruction[1] - 1, instruction[2] - 1];
    });

  return [stacks, instructions];
}
