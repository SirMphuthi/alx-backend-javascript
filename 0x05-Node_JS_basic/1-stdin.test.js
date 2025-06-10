const { exec } = require('child_process');
const path = require('path');

// Get the path to the 1-stdin.js script
const scriptPath = path.join(__dirname, '1-stdin.js');

describe('1-stdin.js', () => {
  // Test case for interactive input (user types name)
  it('should display welcome message, then name from interactive input, and closing message', (done) => {
    expect.assertions(2); // Added: We expect 2 assertions in this test (output and code)
    const child = exec(`node ${scriptPath}`); // Execute the script

    let output = '';
    // Capture stdout data
    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    // Handle errors (optional, but good for debugging)
    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    // When the child process closes
    child.on('close', (code) => {
      try {
        // Check for the exact output messages
        expect(output).toBe('Welcome to ALX, what is your name?\nYour name is: Bob\nThis important software is now closing\n');
        expect(code).toBe(0); // Ensure successful exit code
        done(); // Signal that the test is complete
      } catch (error) {
        done(error); // Pass any assertion errors to done()
      }
    });

    // Simulate user typing "Bob" and pressing Enter
    child.stdin.write('Bob\n');
    // End the input stream (like pressing Ctrl+D)
    child.stdin.end();
  }, 10000); // Set a timeout for this test (10 seconds)

  // Test case for piped input (name provided via echo)
  it('should display welcome message, then name from piped input, and closing message', (done) => {
    expect.assertions(3); // Added: We expect 3 assertions in this test (error, stderr, stdout)
    // Execute the script with piped input
    const command = `echo "John" | node ${scriptPath}`;
    exec(command, (error, stdout, stderr) => {
      try {
        expect(error).toBeNull(); // Ensure no execution error
        expect(stderr).toBe(''); // Ensure no stderr output
        // Check for the exact output messages
        expect(stdout).toBe('Welcome to ALX, what is your name?\nYour name is: John\nThis important software is now closing\n');
        done(); // Signal that the test is complete
      } catch (assertionError) {
        done(assertionError); // Pass any assertion errors to done()
      }
    });
  }, 10000); // Set a timeout for this test (10 seconds)
});
