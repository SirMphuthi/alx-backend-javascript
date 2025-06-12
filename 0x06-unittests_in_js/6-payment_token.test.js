#!/usr/bin/env node

const { expect } = require('chai'); // Import expect from Chai
const getPaymentTokenFromAPI = require('./6-payment_token'); // Import the function to be tested

describe('getPaymentTokenFromAPI', () => {
  // Test case for when success is true (resolved promise)
  it('should return a resolved promise with correct data when success is true', (done) => {
    // Call the function with success = true
    getPaymentTokenFromAPI(true)
      .then((response) => {
        // Assert that the response object matches the expected data
        expect(response).to.deep.equal({ data: 'Successful response from the API' });
        done(); // Call done() to signal that the asynchronous test is complete
      })
      .catch((error) => {
        // If the promise unexpectedly rejects, fail the test
        done(error); // Pass the error to done()
      });
  });

  // Note: The task description for this specific test does not require testing
  // the 'false' case directly, as it states the function "is doing nothing".
  // A test for the 'false' case would typically involve verifying no promise is returned
  // or that it times out if a promise is expected but never resolves/rejects.
  // We'll stick to the explicit requirement of testing the `true` case.
});
