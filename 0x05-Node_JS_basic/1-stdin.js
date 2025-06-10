#!/usr/bin/env node

console.log('Welcome to ALX, what is your name?');

// Set the encoding for standard input
process.stdin.setEncoding('utf8');

// Event listener for data received from stdin
process.stdin.on('data', (data) => {
  // Trim whitespace (like newline characters) from the input
  const name = data.toString().trim();
  console.log(`Your name is: ${name}`);
});

// Event listener for the end of input from stdin
process.stdin.on('end', () => {
  console.log('This important software is now closing');
});
