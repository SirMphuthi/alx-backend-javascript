#!/usr/bin/env node
/**
 * Reads input from STDIN and displays a welcome message,
 * the user's name, and a closing message.
 */

// Display the initial welcome message
console.log('Welcome to Holberton School, what is your name?');

// Set stdin encoding to handle text input
process.stdin.setEncoding('utf8');

// Listen for 'data' events from stdin
process.stdin.on('data', (data) => {
  // Convert Buffer to string and remove leading/trailing whitespace
  const name = data.toString().trim();
  // Display the user's name
  console.log(`Your name is: ${name}`);
});

// Listen for 'end' event from stdin
process.stdin.on('end', () => {
  // Display the closing message
  console.log('This important software is now closing');
  // Explicitly exit the process
  process.exit(0);
});
