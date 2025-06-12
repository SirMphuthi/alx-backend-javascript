#!/usr/bin/env node

const assert = require('assert'); // Node.js built-in assertion library
const calculateNumber = require('./0-calcul'); // Import the function to be tested

describe('calculateNumber', () => {
  // Test cases for rounding different decimal values for 'a' and 'b'

  // Test case 1: Whole numbers
  it('should return the sum of rounded numbers for whole numbers', () => {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  // Test case 2: One float, rounds up
  it('should return the sum of rounded numbers when one float rounds up', () => {
    assert.strictEqual(calculateNumber(1, 3.7), 5); // 1 + 4 = 5
  });

  // Test case 3: Both floats, one rounds down, one rounds up
  it('should return the sum of rounded numbers when both are floats (1.2 rounds down, 3.7 rounds up)', () => {
    assert.strictEqual(calculateNumber(1.2, 3.7), 5); // 1 + 4 = 5
  });

  // Test case 4: Both floats, both round up
  it('should return the sum of rounded numbers when both are floats (1.5 rounds up, 3.7 rounds up)', () => {
    assert.strictEqual(calculateNumber(1.5, 3.7), 6); // 2 + 4 = 6
  });

  // Test case 5: Both floats, both round down
  it('should return the sum of rounded numbers when both are floats (1.2 rounds down, 3.2 rounds down)', () => {
    assert.strictEqual(calculateNumber(1.2, 3.2), 4); // 1 + 3 = 4
  });

  // Test case 6: One float, rounds down
  it('should return the sum of rounded numbers when one float rounds down', () => {
    assert.strictEqual(calculateNumber(1.2, 3), 4); // 1 + 3 = 4
  });

  // Test case 7: Zeroes
  it('should return 0 when both numbers are 0', () => {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });

  // Test case 8: Negative numbers
  it('should correctly sum negative numbers', () => {
    assert.strictEqual(calculateNumber(-1, -3), -4); // -1 + -3 = -4
  });

  // Test case 9: Negative floats, rounding up
  it('should correctly sum negative floats rounding up (towards zero)', () => {
    assert.strictEqual(calculateNumber(-1.2, -3.7), -5); // -1 + -4 = -5
  });

  // Test case 10: Negative floats, rounding down (away from zero)
  it('should correctly sum negative floats rounding down (away from zero)', () => {
    assert.strictEqual(calculateNumber(-1.5, -3.2), -4); // -1 + -3 = -4 (Math.round(-1.5) is -1, Math.round(-3.2) is -3)
  });

  // Test case 11: Mixed positive and negative
  it('should correctly sum mixed positive and negative numbers', () => {
    assert.strictEqual(calculateNumber(-1, 3.7), 3); // -1 + 4 = 3
  });

  // Test case 12: Mixed positive and negative, more complex rounding
  it('should correctly sum mixed positive and negative numbers with complex rounding', () => {
    assert.strictEqual(calculateNumber(-1.8, 3.2), 1); // -2 + 3 = 1
  });

  // Test case 13: Edge case for .5 (rounds up)
  it('should handle .5 rounding correctly (1.5 rounds to 2)', () => {
    assert.strictEqual(calculateNumber(1.5, 0), 2); // 2 + 0 = 2
  });

  // Test case 14: Another .5 edge case
  it('should handle .5 rounding correctly (0, 3.5 rounds to 4)', () => {
    assert.strictEqual(calculateNumber(0, 3.5), 4); // 0 + 4 = 4
  });
});
