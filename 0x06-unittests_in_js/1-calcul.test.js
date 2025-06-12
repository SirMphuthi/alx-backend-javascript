#!/usr/bin/env node

const assert = require('assert'); // Node.js built-in assertion library
const calculateNumber = require('./1-calcul'); // Import the function to be tested

describe('calculateNumber', () => {
  // Test cases for type 'SUM'
  describe('type: SUM', () => {
    it('should return the sum of rounded numbers for whole numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 1, 3), 4); // 1 + 3 = 4
    });

    it('should return the sum of rounded numbers for float numbers (round up)', () => {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6); // 1 + 5 = 6
    });

    it('should return the sum of rounded numbers for float numbers (round down)', () => {
      assert.strictEqual(calculateNumber('SUM', 1.2, 3.2), 4); // 1 + 3 = 4
    });

    it('should return the sum of rounded numbers for mixed floats', () => {
      assert.strictEqual(calculateNumber('SUM', 1.5, 3.7), 6); // 2 + 4 = 6
    });

    it('should handle negative numbers correctly', () => {
      assert.strictEqual(calculateNumber('SUM', -1.4, -3.7), -5); // -1 + -4 = -5
    });

    it('should handle mixed positive and negative numbers', () => {
      assert.strictEqual(calculateNumber('SUM', -1.8, 3.2), 1); // -2 + 3 = 1
    });

    it('should return 0 when both are 0', () => {
      assert.strictEqual(calculateNumber('SUM', 0, 0), 0);
    });
  });

  // Test cases for type 'SUBTRACT'
  describe('type: SUBTRACT', () => {
    it('should return the subtraction of rounded numbers for whole numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 5, 3), 2); // 5 - 3 = 2
    });

    it('should return the subtraction of rounded numbers for float numbers (round up)', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4); // 1 - 5 = -4
    });

    it('should return the subtraction of rounded numbers for float numbers (round down)', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 5.8, 2.2), 4); // 6 - 2 = 4
    });

    it('should handle negative numbers correctly', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -1.4, -3.7), 3); // -1 - (-4) = 3
    });

    it('should handle mixed positive and negative numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.8, -3.2), 5); // 2 - (-3) = 5
    });

    it('should return 0 when subtracting identical numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 3, 3), 0);
    });
  });

  // Test cases for type 'DIVIDE'
  describe('type: DIVIDE', () => {
    it('should return the division of rounded numbers for positive values', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2); // 1 / 5 = 0.2
    });

    it('should return the division of rounded numbers for negative values', () => {
      assert.strictEqual(calculateNumber('DIVIDE', -1.4, -4.5), 0.25); // -1 / -5 = 0.2
    });

    it('should return the division of rounded numbers for mixed values', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 10, 2.5), 3.3333333333333335); // 10 / 3 = 3.33...
    });

    it('should return "Error" when roundedB is 0 (0.0)', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error'); // 1 / 0 = Error
    });

    it('should return "Error" when roundedB is 0 (0.2)', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 10, 0.2), 'Error'); // 10 / 0 = Error
    });

    it('should return "Error" when roundedB is 0 (-0.2)', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 10, -0.2), 'Error'); // 10 / 0 = Error
    });

    it('should handle division by 1', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 5, 1), 5); // 5 / 1 = 5
    });

    it('should handle division of 0 by non-zero', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 0, 5), 0); // 0 / 5 = 0
    });
  });
});
