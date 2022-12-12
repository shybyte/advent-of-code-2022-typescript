import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { executeCommands, parseCommands, solve } from './day10';

const PART2_KNOT_NUMBER = 10;

test('simple-1', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple-1.txt', 'utf8');
  const commands = parseCommands(input);
  console.log('commands:', commands);
  const registerXValuesOverTime = executeCommands(commands);
  expect(registerXValuesOverTime).toEqual([1, 1, 1, 4, 4, -1]);
  console.log('registerXValuesOverTime:', registerXValuesOverTime);
});

test('simple-2', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple-2.txt', 'utf8');

  const solution1 = solve(input);
  expect(solution1).toBe(13140);
});

test('large', () => {
  const input = readFileSync(import.meta.dir + '/test-data-large.txt', 'utf8');

  const solution1 = solve(input);
  expect(solution1).toBe(16060);

  // const solution2 = solve(input, PART2_KNOT_NUMBER);
  // expect(solution2).toBe(2331);
});
