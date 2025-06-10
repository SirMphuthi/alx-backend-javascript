#!/usr/bin/env node

// Display the initial welcome message using process.stdout.write
process.stdout.write('Welcome to ALX, what is your name?\n');

// Check if stdin is a TTY (interactive terminal)
if (process.stdin.isTTY) {
  // If in TTY mode, listen for data (user input)
  process.stdin.on('data', (data) => {
    // Process the input and display the name
    const name = data.toString().trim(); // Use trim() for robustness
    process.stdout.write(`Your name is: ${name}\n`);
    process.exit(); // Exit the program immediately after getting the name
  });
} else {
  // If not in TTY mode (e.g., piped input like `echo "John" | ...`)
  process.stdin.on('data', (data) => {
    // Process the input and display the name
    const name = data.toString().trim(); // Use trim() for robustness
    process.stdout.write(`Your name is: ${name}\n`);
    process.exit(); // Exit the program immediately after getting the name
  });

  // In non-TTY mode, listen for the 'exit' event to display the closing message
  // This will fire when process.exit() is called in the data handler.
  process.on('exit', () => {
    process.stdout.write('This important software is now closing\n');
  });
}
