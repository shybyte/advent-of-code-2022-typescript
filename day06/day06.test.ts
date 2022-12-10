import { expect, test } from 'bun:test';
import { solvePart1, solvePart2 } from './day06';
import { readFileSync } from 'fs';

test('simple', () => {
  const input1 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
  expect(solvePart1(input1)).toBe(7);

  expect(solvePart1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
  expect(solvePart1('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
  expect(solvePart1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
  expect(solvePart1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);

  expect(solvePart2(input1)).toBe(19);
  expect(solvePart2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23);
  expect(solvePart2('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23);
  expect(solvePart2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29);
  expect(solvePart2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
});

test('large', () => {
  const input = readFileSync(import.meta.dir + '/test-data-large.txt', 'utf8');

  const solution1 = solvePart1(input);
  expect(solution1).toBe(1876);

  const solution2 = solvePart2(input);
  expect(solution2).toBe(2202);
});
