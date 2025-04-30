import { expect, test, describe } from "vitest";
import {
  capitalize,
  reverseString,
  isPalindrome,
} from "../utils/stringUtils.js";

describe("string utilities", () => {
  describe("capitalize", () => {
    test("should capitalize single word", () => {
      expect(capitalize("hello")).toBe("Hello");
    });

    test("should leave sentence as is", () => {
      expect(capitalize("hello world")).toBe("Hello world");
    });

    test("should not change already capitalized text", () => {
      expect(capitalize("HELLO WORLD")).toBe("HELLO WORLD");
    });

    test("should throw error for non-string input", () => {
      expect(() => capitalize(123)).toThrow("Input must be a string");
    });
  });

  describe("reverseString", () => {
    test("should reverse single word", () => {
      expect(reverseString("hello")).toBe("olleh");
    });

    test("should reverse sentence", () => {
      expect(reverseString("hello world")).toBe("dlrow olleh");
    });

    test("should reverse already reversed text", () => {
      expect(reverseString("olleh")).toBe("hello");
    });

    test("should throw error for non-string input", () => {
      expect(() => reverseString(123)).toThrow("Input must be a string");
    });

    test("should return empty string for empty input", () => {
      expect(reverseString("")).toBe("");
    });
  });

  describe("isPalindrome", () => {
    test("should return true for palindrome", () => {
      expect(isPalindrome("racecar")).toBe(true);
    });

    test("should return false for non-palindrome", () => {
      expect(isPalindrome("hello")).toBe(false);
    });

    //should ignore case and spaces
    test("should ignore case and spaces", () => {
      expect(isPalindrome("A man a plan a canal Panama")).toBe(false);
    });

    //should ignore punctuation
    test("should ignore punctuation", () => {
      expect(isPalindrome("Was it a car or a cat I saw?")).toBe(false);
    });

    test("should throw error for non-string input", () => {
      expect(() => isPalindrome(123)).toThrow("Input must be a string");
    });

    test("should return true for empty string", () => {
      expect(isPalindrome("")).toBe(true);
    });
  });
});
