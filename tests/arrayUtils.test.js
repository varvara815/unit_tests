import { expect, test, describe } from 'vitest';
import { findMax, findMin, removeDuplicates } from '../utils/arrayUtils.js';
const a = 1;
const a = 5;
describe('array utilities', () => {
  describe('findMax', () => {
    test('should return max value in array', () => {
      expect(findMax([1, 2])).toBe(2);
    });

    test('should return single element when array has only one item', () => {
      expect(findMax([1])).toBe(1);
    });

    test('should return max value in negative array', () => {
      expect(findMax([-1, -2])).toBe(-1);
    });

    test('should return max value in array with zeros', () => {
      expect(findMax([0, 0])).toBe(0);
    });

    test('should return max value in array with duplicates', () => {
      expect(findMax([1, 2, 2, 3, 3, 3])).toBe(3);
    });

    test('should return -Infinity for empty array', () => {
      expect(findMax([])).toBe(-Infinity);
    });

    test('should throw error for non-array input', () => {
      expect(() => findMax('hello')).toThrow('Input must be an array');
    });
  });

  describe('findMin', () => {
    test('should return min value in array', () => {
      expect(findMin([1, 2])).toBe(1);
    });

    test('should return single element when array has only one item', () => {
      expect(findMin([1])).toBe(1);
    });

    test('should return min value in negative array', () => {
      expect(findMin([-1, -2])).toBe(-2);
    });

    test('should return min value in array with zeros', () => {
      expect(findMin([0, 0])).toBe(0);
    });

    test('should return min value in array with duplicates', () => {
      expect(findMin([1, 2, 2, 3, 3, 3])).toBe(1);
    });

    test('should return Infinity for empty array', () => {
      expect(findMin([])).toBe(Infinity);
    });

    test('should throw error for non-array input', () => {
      expect(() => findMin('hello')).toThrow('Input must be an array');
    });

    test('should handle NaN value in array', () => {
      expect(findMin([1, NaN])).toBe(NaN);
    });
  });

  describe('removeDuplicates', () => {
    test('should return array without duplicates', () => {
      expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('should remove duplicates from array', () => {
      expect(removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    test('should return empty array for empty input', () => {
      expect(removeDuplicates([])).toEqual([]);
    });

    test('should throw error for non-array input', () => {
      expect(() => removeDuplicates('hello')).toThrow('Input must be an array');
    });

    test('should remove all zeros from array', () => {
      expect(removeDuplicates([0, 0, 0])).toEqual([0]);
    });

    test('should handle array with negative numbers', () => {
      expect(removeDuplicates([-1, -2, -2, 0, 1, 1])).toEqual([-1, -2, 0, 1]);
    });
  });
});
