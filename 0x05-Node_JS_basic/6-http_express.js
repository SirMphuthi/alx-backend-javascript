#!/usr/bin/env node
const express = require('express'); // Import the Express.js framework

// Create an Express application instance
const app = express();

// Define a route for the root endpoint '/'
app.get('/', (req, res) => {
  // Send "Hello ALX!" as the response for GET requests to the root path
  res.send('Hello ALX!');
});

// The server should listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  // Optional: Log message to console when server starts for local testing
  // console.log(`Express server listening on port ${PORT}`);
});

// Export the Express app instance for testing purposes
module.exports = app;
