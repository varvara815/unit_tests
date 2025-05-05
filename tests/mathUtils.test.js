import { expect, test, describe } from 'vitest';
import { add, subtract, multiply, divide } from '../utils/mathUtils.js';

describe('math operations', () => {
  describe('addition', () => {
    test('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should add two negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test('should add mixed numbers', () => {
      expect(add(2, -3)).toBe(-1);
    });

    test('should return zero when adding zeros', () => {
      expect(add(0, 0)).toBe(0);
    });

    test('should return NaN when adding with NaN', () => {
      expect(add(2, NaN)).toBeNaN();
    });

    test('should return Infinity when adding with Infinity', () => {
      expect(add(2, Infinity)).toBe(Infinity);
    });

    test('should concatenate strings when adding with string', () => {
      expect(add(2, '3')).toBe('23');
    });

    test('should convert boolean to number when adding with boolean', () => {
      expect(add(2, true)).toBe(3);
    });
  });

  describe('subtraction', () => {
    test('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test('should subtract two negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2);
    });

    test('should subtract mixed numbers', () => {
      expect(subtract(5, -3)).toBe(8);
    });

    test('should return zero when subtracting zeros', () => {
      expect(subtract(0, 0)).toBe(0);
    });

    test('should return NaN when subtracting with NaN', () => {
      expect(subtract(2, NaN)).toBeNaN();
    });

    test('should return negative Infinity when subtracting with Infinity', () => {
      expect(subtract(2, Infinity)).toBe(-Infinity);
    });

    test('should return negative number when subtracting with string', () => {
      expect(subtract(2, '3')).toBe(-1);
    });

    test('should return original number when subtracting with empty string', () => {
      expect(subtract(2, '')).toBe(2);
    });

    test('should convert boolean to number when subtracting with boolean', () => {
      expect(subtract(2, true)).toBe(1);
    });
  });

  describe('multiplication', () => {
    test('should multiply two positive numbers', () => {
      expect(multiply(2, 3)).toBe(6);
    });

    test('should multiply two negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6);
    });

    test('should multiply mixed numbers', () => {
      expect(multiply(2, -3)).toBe(-6);
    });

    test('should return zero when multiplying zeros', () => {
      expect(multiply(0, 0)).toBe(0);
    });

    test('should return NaN when multiplying with NaN', () => {
      expect(multiply(2, NaN)).toBeNaN();
    });

    test('should return Infinity when multiplying with Infinity', () => {
      expect(multiply(2, Infinity)).toBe(Infinity);
    });

    test('should convert string to number when multiplying with string', () => {
      expect(multiply(2, '3')).toBe(6);
    });
  });

  describe('division', () => {
    test('should divide two positive numbers', () => {
      expect(divide(6, 3)).toBe(2);
    });

    test('should divide two negative numbers', () => {
      expect(divide(-6, -3)).toBe(2);
    });

    test('should divide mixed numbers', () => {
      expect(divide(-6, 3)).toBe(-2);
    });

    test('should throw an error when dividing by zero', () => {
      expect(() => divide(0, 0)).toThrow('Cannot divide by zero');
    });

    test('should return NaN when dividing with NaN', () => {
      expect(divide(2, NaN)).toBeNaN();
    });

    test('should return zero when dividing with Infinity', () => {
      expect(divide(2, Infinity)).toBe(0);
    });
  });
});
