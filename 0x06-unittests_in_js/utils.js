#!/usr/bin/env node

const Utils = {
  /**
   * Performs a calculation on two numbers after rounding them, based on the specified type.
   * This is the same logic as in 1-calcul.js.
   * @param {string} type - The type of operation ('SUM', 'SUBTRACT', 'DIVIDE').
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number|string} The result of the operation, or 'Error' if dividing by zero.
   */
  calculateNumber: (type, a, b) => {
    const roundedA = Math.round(a);
    const roundedB = Math.round(b);

    switch (type) {
      case 'SUM':
        return roundedA + roundedB;
      case 'SUBTRACT':
        return roundedA - roundedB;
      case 'DIVIDE':
        if (roundedB === 0) {
          return 'Error';
        }
        return roundedA / roundedB;
      default:
        throw new Error('Invalid operation type. Must be SUM, SUBTRACT, or DIVIDE.');
    }
  },
};

module.exports = Utils;
