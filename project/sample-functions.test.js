// functions.test.js
const { div, containsNumbers } = require('./calc');

describe('div function', () => {
  test('should divide two numbers correctly', () => {
    expect(div(6, 2)).toBe(3);
  });

  test('should throw an error when dividing by zero', () => {
    expect(() => div(6, 0)).toThrow("Cannot divide by zero");
  });

  test('should return a negative result when dividing positive by negative number', () => {
    expect(div(6, -2)).toBe(-3);
  });

  test('should return a positive result when dividing negative by negative number', () => {
    expect(div(-6, -2)).toBe(3);
  });
});

describe('containsNumbers function', () => {
  test('should return true if string contains a number', () => {
    expect(containsNumbers("hello123")).toBe(true);
  });

  test('should return false if string contains no numbers', () => {
    expect(containsNumbers("hello")).toBe(false);
  });

  test('should return true for a string with only a number', () => {
    expect(containsNumbers("123")).toBe(true);
  });

  test('should return false for an empty string', () => {
    expect(containsNumbers("")).toBe(false);
  });
});
