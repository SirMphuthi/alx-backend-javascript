#!/usr/bin/env node

/**
 * Simulates fetching a payment token from an API asynchronously.
 *
 * @param {boolean} success - Indicates whether the API call should succeed.
 * @returns {Promise<object>|undefined} A resolved Promise with data if success is true,
 * otherwise does nothing (returns undefined).
 */
function getPaymentTokenFromAPI(success) {
  if (success) {
    return Promise.resolve({ data: 'Successful response from the API' });
  }
  // If success is false, the function is doing nothing as per requirement,
  // which means it implicitly returns undefined or a non-Promise value.
  // For this task, we explicitly only return a Promise on success.
  return undefined;
}

module.exports = getPaymentTokenFromAPI;
