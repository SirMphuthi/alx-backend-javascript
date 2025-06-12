#!/usr/bin/env node

/**
 * Performs a calculation on two numbers after rounding them, based on the specified type.
 * @param {string} type - The type of operation ('SUM', 'SUBTRACT', 'DIVIDE').
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number|string} The result of the operation, or 'Error' if dividing by zero.
 */
const calculateNumber = (type, a, b) => {
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
      // This case should ideally not be reached based on task description,
      // but it's good practice to handle unexpected types.
      throw new Error('Invalid operation type. Must be SUM, SUBTRACT, or DIVIDE.');
  }
};

module.exports = calculateNumber;
