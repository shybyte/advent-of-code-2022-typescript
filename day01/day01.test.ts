import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { getMaxElfCalories, getSumOfTopThreeElves } from './day01';

test('simple', () => {
  const input = readFileSync(import.meta.dir + '/test-data-simple.txt', 'utf8');

  const maxElfCalories = getMaxElfCalories(input);
  expect(maxElfCalories).toBe(24000);

  const sumOfTopThreeElves = getSumOfTopThreeElves(input);
  expect(sumOfTopThreeElves).toBe(45000);
});

test('large', () => {
  const input = readFileSync(import.meta.dir + '/test-data-large.txt', 'utf8');

  const maxElfCalories = getMaxElfCalories(input);
  expect(maxElfCalories).toBe(70374);

  const sumOfTopThreeElves = getSumOfTopThreeElves(input);
  expect(sumOfTopThreeElves).toBe(204610);
});
