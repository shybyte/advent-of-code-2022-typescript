import { beforeEach, describe, expect, it, test } from 'bun:test';
import { readFileSync } from 'fs';
import parseMap, { calculateScenicScore, solvePart1, solvePart2 } from './day08';

test('simple', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple.txt', 'utf8');

  const solution1 = solvePart1(input);
  expect(solution1).toBe(21);

  const solution2 = solvePart2(input);
  expect(solution2).toBe(8);
});

test('large', () => {
  const input = readFileSync(import.meta.dir + '/test-data-large.txt', 'utf8');

  const solution1 = solvePart1(input);
  expect(solution1).toBe(1818);

  const solution2 = solvePart2(input);
  expect(solution2).toBe(368368);
});

it('calculateScenicScore should work for simple examples', () => {
  const map = parseMap(readFileSync(import.meta.dir + '/test-data-simple.txt', 'utf8'));
  expect(calculateScenicScore(map, 2, 1)).toBe(4);
});
