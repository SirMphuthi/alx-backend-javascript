#!/usr/bin/env node

// Display the initial welcome message
process.stdout.write('Welcome to  Holberton School, what is your name?\n');

// Set stdin encoding
process.stdin.setEncoding('utf8');

// Check if stdin is a TTY (interactive terminal)
if (process.stdin.isTTY) {
  // In TTY mode, listen for data (user input)
  process.stdin.on('data', (data) => {
    // Process input and display name
    const name = data.toString().trim();
    process.stdout.write(`Your name is: ${name}\n`);
    process.exit(); // Exit after name is received
  });
} else {
  // Non-TTY mode (e.g., piped input)
  process.stdin.on('data', (data) => {
    // Process input and display name
    const name = data.toString().trim();
    process.stdout.write(`Your name is: ${name}\n`);
    process.exit(); // Exit after name is received
  });

  // Listen for 'exit' event to display closing message (non-TTY only)
  process.on('exit', () => {
    process.stdout.write('This important software is now closing\n');
  });
}
