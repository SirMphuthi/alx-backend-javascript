#!/usr/bin/env node
/**
 * Displays a message to the STDOUT.
 * @param {string} message The message to display.
 */
function displayMessage(message) {
  process.stdout.write(message + '\n'); // Added a semicolon
}

module.exports = displayMessage; // Added a semicolon
