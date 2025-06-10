#!/usr/bin/env node
const http = require('http'); // Import the built-in Node.js http module

// Create an HTTP server instance and assign it to the 'app' variable
const app = http.createServer((req, res) => {
  // Set the response HTTP header with status 200 (OK) and Content-Type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body "Hello ALX!"
  res.end('Hello ALX!');
});

// The server should listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  // console.log(`Server is listening on port ${PORT}`); // Optional: for local testing
});

// Export the app variable (the HTTP server instance)
module.exports = app;
