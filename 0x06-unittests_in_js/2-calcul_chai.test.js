#!/usr/bin/env node

const { expect } = require('chai'); // Import expect from Chai
const calculateNumber = require('./2-calcul_chai'); // Import the function to be tested

describe('calculateNumber', () => {
  // Test cases for type 'SUM'
  describe('type: SUM', () => {
    it('should return the sum of rounded numbers for whole numbers', () => {
      expect(calculateNumber('SUM', 1, 3)).to.equal(4); // 1 + 3 = 4
    });

    it('should return the sum of rounded numbers for float numbers (round up)', () => {
      expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6); // 1 + 5 = 6
    });

    it('should return the sum of rounded numbers for float numbers (round down)', () => {
      expect(calculateNumber('SUM', 1.2, 3.2)).to.equal(4); // 1 + 3 = 4
    });

    it('should return the sum of rounded numbers for mixed floats', () => {
      expect(calculateNumber('SUM', 1.5, 3.7)).to.equal(6); // 2 + 4 = 6
    });

    it('should handle negative numbers correctly', () => {
      expect(calculateNumber('SUM', -1.4, -3.7)).to.equal(-5); // -1 + -4 = -5
    });

    it('should handle mixed positive and negative numbers', () => {
      expect(calculateNumber('SUM', -1.8, 3.2)).to.equal(1); // -2 + 3 = 1
    });

    it('should return 0 when both are 0', () => {
      expect(calculateNumber('SUM', 0, 0)).to.equal(0);
    });
  });

  // Test cases for type 'SUBTRACT'
  describe('type: SUBTRACT', () => {
    it('should return the subtraction of rounded numbers for whole numbers', () => {
      expect(calculateNumber('SUBTRACT', 5, 3)).to.equal(2); // 5 - 3 = 2
    });

    it('should return the subtraction of rounded numbers for float numbers (round up)', () => {
      expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4); // 1 - 5 = -4
    });

    it('should return the subtraction of rounded numbers for float numbers (round down)', () => {
      expect(calculateNumber('SUBTRACT', 5.8, 2.2)).to.equal(4); // 6 - 2 = 4
    });

    it('should handle negative numbers correctly', () => {
      expect(calculateNumber('SUBTRACT', -1.4, -3.7)).to.equal(3); // -1 - (-4) = 3
    });

    it('should handle mixed positive and negative numbers', () => {
      expect(calculateNumber('SUBTRACT', 1.8, -3.2)).to.equal(5); // 2 - (-3) = 5
    });

    it('should return 0 when subtracting identical numbers', () => {
      expect(calculateNumber('SUBTRACT', 3, 3)).to.equal(0);
    });
  });

  // Test cases for type 'DIVIDE'
  describe('type: DIVIDE', () => {
    it('should return the division of rounded numbers for positive values', () => {
      expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2); // 1 / 5 = 0.2
    });

    it('should return the division of rounded numbers for negative values', () => {
      expect(calculateNumber('DIVIDE', -1.4, -4.5)).to.equal(0.25); // -1 / -5 = 0.2 (Note: 1/5 is 0.2, not 0.25)
    });

    it('should return the division of rounded numbers for mixed values', () => {
      expect(calculateNumber('DIVIDE', 10, 2.5)).to.equal(3.3333333333333335); // 10 / 3 = 3.33...
    });

    it('should return "Error" when roundedB is 0 (0.0)', () => {
      expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error'); // 1 / 0 = Error
    });

    it('should return "Error" when roundedB is 0 (0.2)', () => {
      expect(calculateNumber('DIVIDE', 10, 0.2)).to.equal('Error'); // 10 / 0 = Error
    });

    it('should return "Error" when roundedB is 0 (-0.2)', () => {
      expect(calculateNumber('DIVIDE', 10, -0.2)).to.equal('Error'); // 10 / 0 = Error
    });

    it('should handle division by 1', () => {
      expect(calculateNumber('DIVIDE', 5, 1)).to.equal(5); // 5 / 1 = 5
    });

    it('should handle division of 0 by non-zero', () => {
      expect(calculateNumber('DIVIDE', 0, 5)).to.equal(0); // 0 / 5 = 0
    });
  });
});
