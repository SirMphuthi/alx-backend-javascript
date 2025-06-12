#!/usr/bin/env node
const request = require('request'); // For making HTTP requests
const { expect } = require('chai'); // For assertions

// Import the Express app
const app = require('./api');

describe('API Integration Tests', () => { // Changed describe block name for clarity
  const API_URL = 'http://localhost:7865'; // Define the base URL for the API
  let server; // To hold the server instance so we can close it

  // Use before to start the server once before all tests in this suite
  before((done) => {
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

  // Test suite for the Index page (already existing)
  describe('Index page', () => {
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

    // Test case 3: Other endpoints should return 404 (optional, but good practice)
    it('should return status 404 for GET /other_endpoint', (done) => {
      request.get(`${API_URL}/other_endpoint`, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(body).to.include('Cannot GET /other_endpoint'); // Default Express 404 message
        done(); // Signal test completion
      });
    });
  });

  // NEW Test suite for the Cart page
  describe('Cart page', () => {
    // Test case 1: Correct status code when :id is a number
    it('should return status 200 for GET /cart/:id when :id is a number', (done) => {
      request.get(`${API_URL}/cart/12`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 12');
        done();
      });
    });

    // Test case 2: Correct status code when :id is another number
    it('should return status 200 for GET /cart/:id when :id is another number', (done) => {
      request.get(`${API_URL}/cart/987`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 987');
        done();
      });
    });

    // Test case 3: Correct status code when :id is NOT a number (=> 404)
    it('should return status 404 for GET /cart/:id when :id is NOT a number', (done) => {
      request.get(`${API_URL}/cart/hello`, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(body).to.include('Cannot GET /cart/hello'); // Default Express 404 message
        done();
      });
    });

    // Test case 4: Correct status code for /cart/ (no id)
    it('should return status 404 for GET /cart/ (no ID)', (done) => {
      request.get(`${API_URL}/cart/`, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        expect(body).to.include('Cannot GET /cart/');
        done();
      });
    });
  });
});
