#!/usr/bin/env node

const Utils = require('./utils'); // Import the Utils module

/**
 * Sends a payment request to an API.
 * Calls Utils.calculateNumber to get the total sum and logs the result.
 * @param {number} totalAmount - The total amount.
 * @param {number} totalShipping - The total shipping cost.
 */
function sendPaymentRequestToApi(totalAmount, totalShipping) {
  const sum = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  console.log(`The total is: ${sum}`);
}

module.exports = sendPaymentRequestToApi;
