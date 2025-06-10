/**
 * Displays a message to the STDOUT.
 * @param {string} message The message to display.
 */
function displayMessage(message) {
  process.stdout.write(message + '\n');
}

module.exports = displayMessage;
