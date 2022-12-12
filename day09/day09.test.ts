import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { solve } from './day09';

const PART2_KNOT_NUMBER = 10;

test('simple-1', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple-1.txt', 'utf8');

  const solution1 = solve(input, 2);
  expect(solution1).toBe(13);

  const solution2 = solve(input, PART2_KNOT_NUMBER);
  expect(solution2).toBe(1);
});

test('simple-2', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple-2.txt', 'utf8');

  const solution2 = solve(input, PART2_KNOT_NUMBER);
  expect(solution2).toBe(36);
});

test('large', () => {
  const input = readFileSync(import.meta.dir + '/test-data-large.txt', 'utf8');

  const solution1 = solve(input, 2);
  expect(solution1).toBe(5779);

  const solution2 = solve(input, PART2_KNOT_NUMBER);
  expect(solution2).toBe(2331);
});
