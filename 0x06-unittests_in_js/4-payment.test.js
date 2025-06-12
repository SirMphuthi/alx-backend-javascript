#!/usr/bin/env node

const sinon = require('sinon'); // Import Sinon.js
const { expect } = require('chai'); // Import expect from Chai
const sendPaymentRequestToApi = require('./4-payment'); // Import the function to be tested
const Utils = require('./utils'); // Import Utils to stub/spy on it

describe('sendPaymentRequestToApi', () => {
  let calculateNumberStub; // Declare a stub variable
  let consoleSpy;

  // Use beforeEach to set up stub and spy before each test
  beforeEach(() => {
    // Create a stub for Utils.calculateNumber to always return 10
    calculateNumberStub = sinon.stub(Utils, 'calculateNumber').returns(10);
    // Create a spy on console.log
    consoleSpy = sinon.spy(console, 'log');
  });

  // Use afterEach to restore stub and spy after each test
  afterEach(() => {
    // Restore the stub and spy to their original state
    calculateNumberStub.restore();
    consoleSpy.restore();
  });

  it('should call Utils.calculateNumber with correct arguments and log the stubbed total', () => {
    // Call the function under test
    sendPaymentRequestToApi(100, 20);

    // 1. Verify that Utils.calculateNumber was called once
    expect(calculateNumberStub.calledOnce).to.be.true;

    // 2. Verify that Utils.calculateNumber was called with 'SUM', 100, 20
    expect(calculateNumberStub.calledWith('SUM', 100, 20)).to.be.true;

    // 3. Verify that console.log was called once
    expect(consoleSpy.calledOnce).to.be.true;

    // 4. Verify that console.log was called with 'The total is: 10'
    // This expects the stubbed return value, not the actual calculation.
    expect(consoleSpy.calledWith('The total is: 10')).to.be.true;
  });
});
