#!/usr/bin/env node
/**
 * Reads input from STDIN and displays a welcome message,
 * the user's name, and a closing message.
 */

console.log('Welcome to ALX, what is your name?'); // Changed to console.log()

process.stdin.setEncoding('utf8'); // Set encoding for stdin

process.stdin.on('data', (data) => {
  // Trim whitespace (like newline characters) from the input
  const name = data.toString().trim();
  console.log(`Your name is: ${name}`); // Changed to console.log()
});

process.stdin.on('end', () => {
  console.log('This important software is now closing'); // Changed to console.log()
});
