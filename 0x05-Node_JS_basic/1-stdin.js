#!/usr/bin/env node
/**
 * Reads input from STDIN and displays a welcome message,
 * the user's name, and a closing message.
 */

console.log('Welcome to ALX, what is your name?');

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  // Trim whitespace (like newline characters) from the input
  const name = data.toString().trim();
  console.log(`Your name is: ${name}`);
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
  process.exit(0); // Explicitly exit the process with success code
});
