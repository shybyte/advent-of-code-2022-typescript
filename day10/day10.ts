type Command = ['addx', number] | ['noop'];

export function solve(input: string): number {
  const commands = parseCommands(input);
  const registerXValueByCycle: number[] = executeCommands(commands);
  const signalStrengths = calculateSignalStrengths(registerXValueByCycle);
  console.log('signalStrengths:', signalStrengths);
  return sum(signalStrengths);
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
  function noop() {
    registerXValueByCycle.push(currentRegisterXValue());
  }

  for (const command of commands) {
    if (command[0] === 'addx') {
      noop();
      registerXValueByCycle.push(currentRegisterXValue() + command[1]);
    } else {
      noop();
    }
  }

  return registerXValueByCycle;
}

function calculateSignalStrengths(registerXValueByCycle: number[]) {
  return [20, 60, 100, 140, 180, 220].map((i) => registerXValueByCycle[i] * i);
}

function sum(numbers: number[]): number {
  return numbers.reduce((tempSum, val) => tempSum + val, 0);
}
