#!/usr/bin/env node
const express = require('express');
const countStudents = require('./3-read_file_async'); // Import the async counting function

// Get the database path from command line arguments.
const DATABASE_PATH = process.argv[2];

// Create an Express application instance.
const app = express();

// Middleware to set Content-Type for all responses to plain text
// Express usually handles this based on res.send, but explicit headers can be set.
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain');
  next(); // Pass control to the next handler
});

// Route for the root path '/'
app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

// Route for the /students path
app.get('/students', async (req, res) => {
  let responseText = 'This is the list of our students\n';

  // Temporarily redirect console.log to capture output from countStudents
  const originalConsoleLog = console.log;
  let capturedOutput = '';
  console.log = (...args) => {
    capturedOutput += args.join(' ') + '\n';
  };

  try {
    // Call the async student counting function.
    // Await its completion to ensure all output is captured.
    await countStudents(DATABASE_PATH);
    // Append the captured output, trimming potential extra newlines
    responseText += capturedOutput.trim();
    res.send(responseText);
  } catch (error) {
    // If countStudents throws an error, capture its message.
    responseText = error.message; // Send only the error message
    res.send(responseText);
  } finally {
    // Always restore original console.log, regardless of success or failure.
    console.log = originalConsoleLog;
  }
});

// The server should listen on port 1245.
const PORT = 1245;
app.listen(PORT, () => {
  // Optional: Log message to console when server starts for local testing
  // console.log(`Express server listening on port ${PORT}`);
});

// Export the Express app instance for testing purposes.
module.exports = app;
