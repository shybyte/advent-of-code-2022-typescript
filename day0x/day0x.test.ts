import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { benchmarkFunction } from '../utils/benchmark';
import { solvePart1, solvePart2 } from './day0x';

test('simple', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple.txt', 'utf8');

  const solution1 = solvePart1(input);
  expect(solution1).toBe(0);

  const solution2 = solvePart2(input);
  expect(solution2).toBe(0);
});

test('large', () => {
  const input = readFileSync(import.meta.dir + '/test-data-large.txt', 'utf8');

  const solution1 = solvePart1(input);
  expect(solution1).toBe(0);

  const solution2 = solvePart2(input);
  expect(solution2).toBe(0);

  benchmarkFunction(() => {
    solvePart1(input);
  }, 10_000);

  benchmarkFunction(() => {
    solvePart2(input);
  }, 10_000);
});
