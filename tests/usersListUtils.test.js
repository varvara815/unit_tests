import { expect, test, describe } from 'vitest';
import {
  filterUsersByAge,
  sortUsersByName,
  findUserById,
  isEmailTaken,
} from '../utils/usersListUtils.js';

describe('filterUsersByAge', () => {
  test('should filter users by age correctly', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    const filteredUsers = filterUsersByAge(users, 21, 29);
    expect(filteredUsers).toEqual([
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    ]);
  });

  test('should return an empty array if no users match the age range', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    const filteredUsers = filterUsersByAge(users, 31, 40);
    expect(filteredUsers).toEqual([]);
  });

  test('should throw an error if users is not an array', () => {
    expect(() => filterUsersByAge('not an array', 20, 30)).toThrowError(
      'Users must be an array',
    );
  });

  test('should handle empty array correctly', () => {
    const emptyArray = [];
    const filteredUsers = filterUsersByAge(emptyArray, 20, 30);
    expect(filteredUsers).toEqual([]);
  });

  test('should handle single-element array correctly', () => {
    const singleElementArray = [
      { id: 1, name: 'Test', age: 28, email: 'test@example.com' },
    ];
    const filteredUsers = filterUsersByAge(singleElementArray, 26, 29);
    expect(filteredUsers).toEqual([
      { id: 1, name: 'Test', age: 28, email: 'test@example.com' },
    ]);
  });

  test('should handle edge cases (min > max)', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    const filteredUsers = filterUsersByAge(users, 35, 25);
    expect(filteredUsers).toEqual([]);
  });

  test('should handle string age', () => {
    const users = [
      { id: 1, name: 'Alice', age: '24', email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    const filteredUsers = filterUsersByAge(users, 23, 29);
    expect(filteredUsers).toEqual([
      { id: 1, name: 'Alice', age: '24', email: 'alice@example.com' },
    ]);
  });
});

describe('sortUsersByName', () => {
  test('should sort users by name correctly', () => {
    const users = [
      { id: 1, name: 'Charlie', age: 25, email: 'charlie@example.com' },
      { id: 2, name: 'Alice', age: 30, email: 'alice@example.com' },
      { id: 3, name: 'Bob', age: 20, email: 'bob@example.com' },
    ];
    const sortedUsers = sortUsersByName(users);
    expect(sortedUsers).toEqual([
      { id: 2, name: 'Alice', age: 30, email: 'alice@example.com' },
      { id: 3, name: 'Bob', age: 20, email: 'bob@example.com' },
      { id: 1, name: 'Charlie', age: 25, email: 'charlie@example.com' },
    ]);
  });

  test('should not modify the original array', () => {
    const users = [
      { id: 1, name: 'Charlie', age: 25, email: 'charlie@example.com' },
      { id: 2, name: 'Alice', age: 30, email: 'alice@example.com' },
      { id: 3, name: 'Bob', age: 20, email: 'bob@example.com' },
    ];
    sortUsersByName(users);
    expect(users).toEqual([
      { id: 1, name: 'Charlie', age: 25, email: 'charlie@example.com' },
      { id: 2, name: 'Alice', age: 30, email: 'alice@example.com' },
      { id: 3, name: 'Bob', age: 20, email: 'bob@example.com' },
    ]);
  });

  test('should throw an error if users is not an array', () => {
    expect(() => sortUsersByName('not an array')).toThrowError(
      'Users must be an array',
    );
  });

  test('should return an empty array if users is an empty array', () => {
    const users = [];
    const sortedUsers = sortUsersByName(users);
    expect(sortedUsers).toEqual([]);
  });
});

describe('findUserById', () => {
  test('should find a user by ID correctly', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    const foundUser = findUserById(users, 2);
    expect(foundUser).toEqual({
      id: 2,
      name: 'Bob',
      age: 30,
      email: 'bob@example.com',
    });
  });

  test('should return null if user is not found', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    const foundUser = findUserById(users, 4);
    expect(foundUser).toBeNull();
  });

  test('should throw an error if users is not an array', () => {
    expect(() => findUserById('not an array', 1)).toThrowError(
      'Users must be an array',
    );
  });

  // Test case for duplicate IDs should return both users
  test('should handle duplicate IDs', () => {
    const usersWithDuplicates = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 1, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 2, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    expect(findUserById(usersWithDuplicates, 1)).toEqual({
      id: 1,
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
    });
  });

  test('should handle nested arrays', () => {
    const nestedArray = [
      [1, { id: 2, name: 'Test', age: 30 }],
      [3, { id: 4, name: 'Another Test', age: 25 }],
    ];
    expect(findUserById(nestedArray, 2)).toBeNull();
  });
});

describe('isEmailTaken', () => {
  test('should return true if email is taken', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    const emailTaken = isEmailTaken(users, 'bob@example.com');
    expect(emailTaken).toBe(true);
  });

  test('should return false if email is not taken', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
    ];
    const emailTaken = isEmailTaken(users, 'david@example.com');
    expect(emailTaken).toBe(false);
  });

  test('should throw an error if users is not an array', () => {
    expect(() => isEmailTaken('not an array', 'test@example.com')).toThrowError(
      'Users must be an array',
    );
  });

  test('should handle empty array', () => {
    const emptyArray = [];
    expect(isEmailTaken(emptyArray, 'test@example.com')).toBe(false);
  });

  test('should handle single-element array', () => {
    const singleElementArray = [
      { id: 1, name: 'Test', email: 'test@example.com' },
    ];
    expect(isEmailTaken(singleElementArray, 'test@example.com')).toBe(true);
  });

  test('should handle duplicate emails', () => {
    const usersWithDuplicates = [
      { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'charlie@example.com' },
      { id: 4, name: 'David', age: 35, email: 'alice@example.com' },
    ];
    expect(isEmailTaken(usersWithDuplicates, 'alice@example.com')).toBe(true);
  });

  // Test case for case-insensitive comparison should pass
  test('should handle case-insensitive comparison', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, email: 'ALICE@EXAMPLE.COM' },
      { id: 2, name: 'Bob', age: 30, email: 'BOB@EXAMPLE.COM' },
    ];
    expect(isEmailTaken(users, 'alice@example.com')).toBe(false);
  });
});
