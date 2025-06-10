#!/usr/bin/env node
/**
 * Reads input from STDIN and displays a welcome message,
 * the user's name, and conditionally a closing message.
 */

// Display the initial welcome message
console.log('Welcome to ALX, what is your name?');

// Set stdin encoding to handle text input
process.stdin.setEncoding('utf8');

// Listen for 'data' events from stdin (user input)
process.stdin.on('data', (data) => {
  // Process the input and display the user's name
  const name = data.toString().trim();
  console.log(`Your name is: ${name}`);
});

// Listen for the end of the input stream
process.stdin.on('end', () => {
  // The 'This important software is now closing' message
  // should ONLY be displayed if stdin is NOT a TTY (e.g., piped input like `echo "John" | node script.js`)
  if (!process.stdin.isTTY) {
    console.log('This important software is now closing');
  }
