import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { solvePart1, solvePart2 } from './day08';

test('simple', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple.txt', 'utf8');

  const solution1 = solvePart1(input);
  expect(solution1).toBe(21);

  // const solution2 = solvePart2(input);
  // expect(solution2).toBe(24933642);
});

// test('large', () => {
//   const input = readFileSync(import.meta.dir + '/test-data-large.txt', 'utf8');
//
//   const solution1 = solvePart1(input);
//   expect(solution1).toBe(1543140);
//
//   const solution2 = solvePart2(input);
//   expect(solution2).toBe(1117448);
// });
