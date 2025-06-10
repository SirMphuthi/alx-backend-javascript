#!/usr/bin/env node
/**
 * Reads input from STDIN and displays a welcome message,
 * the user's name, and a closing message.
 */

// Display the initial welcome message
console.log('Welcome to ALX, what is your name?');

// Set stdin encoding to handle text input
process.stdin.setEncoding('utf8');

// Listen for 'data' events from stdin (when user types something)
process.stdin.on('data', (data) => {
  // Convert Buffer to string and remove leading/trailing whitespace (like newline characters from Enter key)
  const name = data.toString().trim();
  // Display the user's name
  console.log(`Your name is: ${name}`);
});

// Listen for 'end' event from stdin (when input stream closes, e.g., Ctrl+D or piped input ends)
process.stdin.on('end', () => {
  // Display the closing message
  console.log('This important software is now closing');
  // Explicitly exit the process (often helpful for child processes to ensure clean termination)
  process.exit(0);
});
