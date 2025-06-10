const { exec } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, '1-stdin.js');

describe('1-stdin.js', () => {
  // Test case for interactive input (user types name)
  // Due to exec, process.stdin.isTTY is false, so closing message is expected.
  it('should display welcome, name, and closing message in "interactive" test', (done) => { // Shortened description
    expect.assertions(2); // Expect 2 assertions: output content and exit code

    const child = exec(`node ${scriptPath}`); // Execute the script

    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      try {
        // In interactive test mode (via exec), closing message is expected
        expect(output).toBe('Welcome to Holberton School, what is your name?\nYour name is: Bob\nThis important software is now closing\n');
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
  it('should display welcome, name, and closing message with piped input', (done) => { // Shortened description
    expect.assertions(3); // Expect 3 assertions: no error, no stderr, and correct stdout content

    const command = `echo "John" | node ${scriptPath}`;
    exec(command, (error, stdout, stderr) => {
      try {
        expect(error).toBeNull(); // No execution errors
        expect(stderr).toBe(''); // No error output
        // With piped input, we DO expect the closing message
        expect(stdout).toBe('Welcome to Holberton School, what is your name?\nYour name is: John\nThis important software is now closing\n');
        done();
      } catch (assertionError) {
        done(assertionError);
      }
    });
  }, 10000); // 10-second timeout
});
