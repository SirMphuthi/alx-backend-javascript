#!/usr/bin/env node
const request = require('request'); // For making HTTP requests
const { expect } = require('chai'); // For assertions

// Import the Express app (this will also start the server due to app.listen in api.js)
const app = require('./api');

describe('Index page', () => {
  const API_URL = 'http://localhost:7865'; // Define the base URL for the API
  let server; // To hold the server instance so we can close it

  // Use before to start the server once before all tests in this suite
  before((done) => {
    // We already required 'api.js' which starts the server.
    // For testing, we ensure it's fully listening before proceeding.
    // We get a reference to the actual server object from the app.
    // This is more robust than just assuming it started.
    server = app.listen(7865, () => {
      done(); // Signal Mocha that setup is complete
    });
  });

  // Use after to close the server once after all tests in this suite
  after((done) => {
    server.close(() => {
      done(); // Signal Mocha that teardown is complete
    });
  });

  // Test case 1: Correct status code for GET /
  it('should return status 200 for GET /', (done) => {
    request.get(API_URL, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done(); // Signal test completion
    });
  });

  // Test case 2: Correct result for GET /
  it('should return "Welcome to the payment system" for GET /', (done) => {
    request.get(API_URL, (error, response, body) => {
      expect(body).to.equal('Welcome to the payment system');
      done(); // Signal test completion
    });
  });

  // Test case 3: Other endpoints should return 404
  it('should return status 404 for GET /other_endpoint', (done) => {
    request.get(`${API_URL}/other_endpoint`, (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      // Express's default 404 body for GET /other_endpoint might contain this
      expect(body).to.include('Cannot GET /other_endpoint');
      done(); // Signal test completion
    });
  });
});
