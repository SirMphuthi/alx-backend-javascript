const { exec } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, '1-stdin.js');

describe('1-stdin.js', () => {
  // Test case for interactive input (user types name)
  it('should display welcome message, then name, but NOT the closing message in TTY mode', (done) => {
    expect.assertions(2); // Expect 2 assertions: output content and exit code

    const child = exec(`node ${scriptPath}`); // Execute the script

    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      try {
        // In interactive (TTY) mode, we expect NO closing message
        expect(output).toBe('Welcome to ALX, what is your name?\nYour name is: Bob\n');
        expect(code).toBe(0); // Program should still exit cleanly
        done();
      } catch (error) {
        done(error);
      }
    });

    // Simulate user input
    child.stdin.write('Bob\n');
    child.stdin.end(); // End the input stream
  }, 10000); // 10-second timeout

  // Test case for piped input (name provided via echo)
  it('should display welcome message, then name, AND the closing message with piped input', (done) => {
    expect.assertions(3); // Expect 3 assertions: no error, no stderr, and correct stdout content

    const command = `echo "John" | node ${scriptPath}`;
    exec(command, (error, stdout, stderr) => {
      try {
        expect(error).toBeNull(); // No execution errors
        expect(stderr).toBe(''); // No error output
        // With piped input, we DO expect the closing message
        expect(stdout).toBe('Welcome to ALX, what is your name?\nYour name is: John\nThis important software is now closing\n');
        done();
      } catch (assertionError) {
        done(assertionError);
      }
    });
  }, 10000); // 10-second timeout
});
