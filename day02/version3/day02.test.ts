import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { getScore1, getScore2 } from './day02';
import { benchmarkFunction } from '../../utils/benchmark';

test('simple', () => {
  const input = readFileSync(import.meta.dir + '/../test-data-simple.txt', 'utf8');

  const score = getScore1(input);
  expect(score).toBe(15);

  const score2 = getScore2(input);
  expect(score2).toBe(12);
});

test('large', () => {
  const input = readFileSync(import.meta.dir + '/../test-data-large.txt', 'utf8');

  const score = getScore1(input);
  expect(score).toBe(17189);

  benchmarkFunction(() => {
    getScore1(input);
  }, 1000);

  const score2 = getScore2(input);
  expect(score2).toBe(13490);

  benchmarkFunction(() => {
    getScore2(input);
  }, 1000);
});
