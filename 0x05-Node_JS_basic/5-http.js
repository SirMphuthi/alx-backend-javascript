#!/usr/bin/env node
const http = require('http');
const countStudents = require('./3-read_file_async'); // Import the async counting function

// Get the database path from command line arguments.
// This is critical for the server to know which database to use.
const DATABASE_PATH = process.argv[2];

// Create an HTTP server instance.
const app = http.createServer(async (req, res) => {
  // Set the default response header to plain text.
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Handle the root path.
  if (req.url === '/') {
    res.end('Hello ALX!');
  } else if (req.url === '/students') {
    let responseText = 'This is the list of our students\n';

    // To capture console.log output from countStudents, we temporarily redirect it.
    const originalConsoleLog = console.log; // Store original console.log
    let capturedOutput = '';
    console.log = (...args) => {
      // Append logged arguments to our captured output
      capturedOutput += args.join(' ') + '\n';
    };

    try {
      // Call the async student counting function.
      // Await its completion to ensure all output is captured.
      await countStudents(DATABASE_PATH);
      // Append the captured output, removing any trailing newline if it exists
      // as console.log adds one, and we might add one in responseText already.
      responseText += capturedOutput.trim();
      res.end(responseText);
    } catch (error) {
      // If countStudents throws an error (e.g., database not found), capture its message.
      responseText = error.message; // Send only the error message as the response
      res.end(responseText);
    } finally {
      // Always restore original console.log, regardless of success or failure.
      console.log = originalConsoleLog;
    }
  } else {
    // For any other path not explicitly handled, respond with "Hello ALX!"
    // This provides a default fallback behavior similar to Task 4.
    res.end('Hello ALX!');
  }
});

// The server should listen on port 1245 as per requirements.
const PORT = 1245;
app.listen(PORT, () => {
  // This console.log is for local dev only, not for checker output
  // console.log(`Server is listening on port ${PORT}`);
});

// Export the app variable (the HTTP server instance) for testing purposes.
module.exports = app;
