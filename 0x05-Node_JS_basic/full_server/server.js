// full_server/server.js
import express from 'express';
import router from './routes'; // Import the router defined in index.js

// Create an Express application instance
const app = express();

// Use the router for all requests
app.use('/', router);

// Set up server to listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  // console.log(`Full server listening on port ${PORT}`); // Optional for local dev
});

// Export the Express app instance
export default app;

