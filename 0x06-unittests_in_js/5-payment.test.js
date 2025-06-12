#!/usr/bin/env node

const sinon = require('sinon'); // Import Sinon.js
const { expect } = require('chai'); // Import expect from Chai
const sendPaymentRequestToApi = require('./5-payment'); // Import the function to be tested
// Note: Utils is implicitly used by sendPaymentRequestToApi,
// but we don't need to import it directly here if we're not spying/stubbing Utils itself.

describe('sendPaymentRequestToApi', () => {
  let consoleSpy;

  // Use beforeEach to set up the spy before each test
  beforeEach(() => {
    // Create a spy on console.log
    consoleSpy = sinon.spy(console, 'log');
  });

  // Use afterEach to restore the spy after each test
  afterEach(() => {
    // Restore the spy to its original state
    consoleSpy.restore();
  });

  // Test case 1: Call with 100, 20
  it('should log "The total is: 120" and be called once for (100, 20)', () => {
    sendPaymentRequestToApi(100, 20);

    // Verify that console.log was called exactly once
    expect(consoleSpy.calledOnce).to.be.true;

    // Verify that console.log was called with the correct message
    // 100 + 20 = 120 (since Utils.calculateNumber performs the actual sum)
    expect(consoleSpy.calledWith('The total is: 120')).to.be.true;
  });

  // Test case 2: Call with 10, 10
  it('should log "The total is: 20" and be called once for (10, 10)', () => {
    sendPaymentRequestToApi(10, 10);

    // Verify that console.log was called exactly once
    expect(consoleSpy.calledOnce).to.be.true;

    // Verify that console.log was called with the correct message
    // 10 + 10 = 20
    expect(consoleSpy.calledWith('The total is: 20')).to.be.true;
  });
});
