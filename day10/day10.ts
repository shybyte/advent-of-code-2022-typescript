type Command = ['addx', number] | ['noop'];

export function solve(input: string): number {
  const commands = parseCommands(input);
  const registerXValueByCycle = executeCommands(commands);
  return sum(calculateSignalStrengths(registerXValueByCycle));
}

export function solve2(input: string): boolean[] {
  const commands = parseCommands(input);
  const registerXValueByCycle = executeCommands(commands);
  return calculatePixel(registerXValueByCycle);
}

export function parseCommands(input: string): Command[] {
  return input
    .trim()
    .split('\n')
    .map((line): Command => {
      return line.split(' ').map((token, i) => (i === 0 ? token : parseInt(token))) as Command;
    });
}

export function executeCommands(commands: Command[]): number[] {
  const registerXValueByCycle: number[] = [1];
  const currentRegisterXValue = () => registerXValueByCycle[registerXValueByCycle.length - 1];

  for (const command of commands) {
    if (command[0] === 'addx') {
      registerXValueByCycle.push(currentRegisterXValue());
      registerXValueByCycle.push(currentRegisterXValue() + command[1]);
    } else {
      registerXValueByCycle.push(currentRegisterXValue());
    }
  }

  return registerXValueByCycle;
}

function calculateSignalStrengths(registerXValueByCycle: number[]) {
  return [20, 60, 100, 140, 180, 220].map((i) => registerXValueByCycle[i - 1] * i);
}

export const SCREEN_WIDTH = 40;
export const SCREEN_HEIGHT = 6;

function calculatePixel(registerXValueByCycle: number[]): boolean[] {
  return registerXValueByCycle.map((regxValue, i) => {
    const x = i % SCREEN_WIDTH;
    return x === regxValue || x === regxValue - 1 || x === regxValue + 1;
  });
}

export function renderPixelsAsString(pixels: boolean[]) {
  let result = '';
  for (let i = 0; i < SCREEN_WIDTH * SCREEN_HEIGHT; i++) {
    if (i > 0 && i % SCREEN_WIDTH === 0) {
      result += '\n';
    }
    result += pixels[i] ? '#' : '.';
  }
  return result;
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
