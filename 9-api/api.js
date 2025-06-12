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

// Define a new route for GET /cart/:id
// :id must be a number (\\d+ regex)
app.get('/cart/:id(\\d+)', (req, res) => {
  const cartId = req.params.id; // Get the ID from the URL parameters
  // Return the message "Payment methods for cart :id"
  res.send(`Payment methods for cart ${cartId}`);
});


// ONLY start the server if this file is executed directly (i.e., not imported as a module)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API available on localhost port ${PORT}`);
  });
}

// Export the app for testing purposes (so api.test.js can access it)
module.exports = app;
