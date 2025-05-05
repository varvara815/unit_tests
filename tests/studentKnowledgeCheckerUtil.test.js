import { expect, test, describe } from "vitest";
import { checkStudentKnowledge } from "../utils/studentKnowledgeCheckerUtil.js";

describe("student knowledge checker", () => {
  test("should return true if all answers match", () => {
    const studentAnswers = { q1: "A", q2: "B", q3: "C" };
    const correctAnswers = { q1: "A", q2: "B", q3: "C" };
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(true);
  });

  test("should return false if one answer is incorrect", () => {
    const studentAnswers = { q1: "A", q2: "B", q3: "D" };
    const correctAnswers = { q1: "A", q2: "B", q3: "C" };
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(false);
  });

  test("should return false if student answers fewer questions", () => {
    const studentAnswers = { q1: "A", q2: "B" };
    const correctAnswers = { q1: "A", q2: "B", q3: "C" };
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(false);
  });

  //should return true if question order differs
  test("should return false if question order differs", () => {
    const studentAnswers = { q1: "A", q2: "B", q3: "C" };
    const correctAnswers = { q1: "A", q3: "C", q2: "B" };
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(false);
  });

  test("should return true for empty objects", () => {
    const studentAnswers = {};
    const correctAnswers = {};
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(true);
  });

  test("should handle different data types correctly", () => {
    const studentAnswers = { q1: "A", q2: 42 };
    const correctAnswers = { q1: "A", q2: 42 };
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(true);
  });

  test("should return false if student answer is null", () => {
    const studentAnswers = { q1: "A", q2: null };
    const correctAnswers = { q1: "A", q2: "B" };
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(false);
  });

  test("should return false if correct answer is null", () => {
    const studentAnswers = { q1: "A", q2: "B" };
    const correctAnswers = { q1: "A", q2: null };
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(false);
  });

  test("should return false if student answer is undefined", () => {
    const studentAnswers = { q1: "A", q2: undefined };
    const correctAnswers = { q1: "A", q2: "B" };
    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).toBe(false);
  });
});
