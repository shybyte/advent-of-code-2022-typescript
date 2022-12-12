import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { executeCommands, parseCommands, renderPixelsAsString, SCREEN_WIDTH, solve, solve2 } from './day10';

const PART2_KNOT_NUMBER = 10;

test('simple-1', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple-1.txt', 'utf8');
  const commands = parseCommands(input);
  const registerXValuesOverTime = executeCommands(commands);
  expect(registerXValuesOverTime).toEqual([1, 1, 1, 4, 4, -1]);
});

test('simple-2', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple-2.txt', 'utf8');

  const solution1 = solve(input);
  expect(solution1).toBe(13140);

  const solution2 = solve2(input);
  expect(renderPixelsAsString(solution2)).toBe(
    `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`,
  );
});

test('large', () => {
  const input = readFileSync(import.meta.dir + '/test-data-large.txt', 'utf8');

  const solution1 = solve(input);
  expect(solution1).toBe(16060);

  const solution2 = solve2(input);
  expect(renderPixelsAsString(solution2)).toBe(`###...##...##..####.#..#.#....#..#.####.
#..#.#..#.#..#.#....#.#..#....#..#.#....
###..#..#.#....###..##...#....####.###..
#..#.####.#....#....#.#..#....#..#.#....
#..#.#..#.#..#.#....#.#..#....#..#.#....
###..#..#..##..####.#..#.####.#..#.#....`);
});
