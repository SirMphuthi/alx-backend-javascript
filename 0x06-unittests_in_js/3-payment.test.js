#!/usr/bin/env node

const sinon = require('sinon'); // Import Sinon.js
const { expect } = require('chai'); // Import expect from Chai
const sendPaymentRequestToApi = require('./3-payment'); // Import the function to be tested
const Utils = require('./utils'); // Import Utils to spy on it

describe('sendPaymentRequestToApi', () => {
  let calculateNumberSpy;
  let consoleSpy;

  // Use beforeEach to set up spies before each test
  beforeEach(() => {
    // Create a spy on Utils.calculateNumber
    calculateNumberSpy = sinon.spy(Utils, 'calculateNumber');
    // Create a spy on console.log
    consoleSpy = sinon.spy(console, 'log');
  });

  // Use afterEach to restore spies after each test
  afterEach(() => {
    // Restore the spies to their original state
    calculateNumberSpy.restore();
    consoleSpy.restore();
  });

  it('should call Utils.calculateNumber with correct arguments and log the total', () => {
    // Call the function under test
    sendPaymentRequestToApi(100, 20);

    // 1. Verify that Utils.calculateNumber was called once
    expect(calculateNumberSpy.calledOnce).to.be.true;

    // 2. Verify that Utils.calculateNumber was called with 'SUM', 100, 20
    expect(calculateNumberSpy.calledWith('SUM', 100, 20)).to.be.true;

    // 3. Verify that console.log was called once
    expect(consoleSpy.calledOnce).to.be.true;

    // 4. Verify that console.log was called with 'The total is: 120'
    // calculateNumber('SUM', 100, 20) => Math.round(100) + Math.round(20) = 100 + 20 = 120
    expect(consoleSpy.calledWith('The total is: 120')).to.be.true;
  });
});
