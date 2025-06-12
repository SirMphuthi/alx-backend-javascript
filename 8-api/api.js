#!/usr/bin/env node
const express = require('express'); // Import the Express.js framework

// Create an Express application instance
const app = express();
const PORT = 7865; // Define the port number as per task

// Define a route for the GET / endpoint
app.get('/', (req, res) => {
  // Return the message "Welcome to the payment system"
  res.send('Welcome to the payment system');
});

// ONLY start the server if this file is executed directly (i.e., not imported as a module)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API available on localhost port ${PORT}`);
  });
}

// Export the app for testing purposes (so api.test.js can access it)
module.exports = app;
// Single blank line here at EOF
