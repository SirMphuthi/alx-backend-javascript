#!/usr/bin/env node
/**
 * Reads input from STDIN and displays a welcome message,
 * the user's name, and a closing message.
 */

process.stdout.write('Welcome to ALX, what is your name?\n');

process.stdin.setEncoding('utf8'); // Set encoding for stdin

process.stdin.on('data', (data) => {
  // Trim whitespace (like newline characters) from the input
  const name = data.toString().trim();
  process.stdout.write(`Your name is: ${name}\n`);
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
