const request = require('request'); // For making HTTP requests
const path = require('path');
const fs = require('fs'); // For mocking database.csv
const sinon = require('sinon'); // For mocking console.log and process.argv

describe('5-http.js', () => {
  const BASE_URL = 'http://localhost:1245';
  let server;
  let originalArgv;
  let originalConsoleLog;

  // Mock database content
  const mockDbData = `firstname,lastname,age,field
Johann,Kerbrou,30,CS
Guillaume,Salou,30,SWE
Arielle,Salou,20,CS
Jonathan,Benou,30,CS
Emmanuel,Turlou,40,CS
Guillaume,Plessous,35,CS
Joseph,Crisou,34,SWE
Paul,Schneider,60,SWE
Tommy,Schoul,32,SWE
Katie,Shirou,21,CS
`;

  // Before all tests, store original process.argv and console.log
  beforeAll(() => {
    originalArgv = process.argv;
    originalConsoleLog = console.log;
  });

  // After all tests, restore process.argv and console.log
  afterAll(() => {
    process.argv = originalArgv;
    console.log = originalConsoleLog;
  });

  // Use beforeEach to ensure a fresh server and clean mocks for each test
  beforeEach((done) => {
    // Clear the require cache for 5-http.js to ensure it's re-required
    // with the updated process.argv for each test.
    delete require.cache[require.resolve('./5-http')];
    // This is crucial because 5-http.js reads process.argv[2] on load.
    const app = require('./5-http');
    server = app.listen(1245, () => {
      done();
    });
  });

  // Use afterEach to close the server cleanly after each test
  afterEach((done) => {
    server.close(() => {
      done();
    });
    // Clean up mock database files created during tests
    if (fs.existsSync(path.join(__dirname, 'mock_database.csv'))) {
      fs.unlinkSync(path.join(__dirname, 'mock_database.csv'));
    }
  });

  // Test case 1: GET request to root endpoint '/'
  it('should return "Hello ALX!" for GET /', (done) => {
    // Set a dummy database path, though it won't be used for '/'
    process.argv = ['node', '5-http.js', path.join(__dirname, 'mock_database.csv')];
    request.get(`${BASE_URL}/`, (error, response, body) => {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(200);
      expect(body).toBe('Hello ALX!');
      done();
    });
  });

  // Test case 2: GET request to /students with a valid database
  it('should return student list for GET /students with valid database', (done) => {
    const dbPath = path.join(__dirname, 'mock_database.csv');
    fs.writeFileSync(dbPath, mockDbData); // Create the mock database file

    // Set process.argv to point to the mock database
    process.argv = ['node', '5-http.js', dbPath];

    const expectedBody = `This is the list of our students
Number of students: 10
Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie
Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy`;

    request.get(`${BASE_URL}/students`, (error, response, body) => {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(200);
      // Use .trim() to normalize potential leading/trailing newlines
      expect(body.trim()).toBe(expectedBody.trim());
      done();
    });
  });

  // Test case 3: GET request to /students with a non-existent database
  it('should return "Cannot load the database" for GET /students with missing database', (done) => {
    const invalidDbPath = path.join(__dirname, 'nonexistent.csv'); // Ensure it doesn't exist
    process.argv = ['node', '5-http.js', invalidDbPath];

    request.get(`${BASE_URL}/students`, (error, response, body) => {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(200); // Still 200 OK as per example error handling
      expect(body).toBe('Cannot load the database');
      done();
    });
  });

  // Test case 4: GET request to an unknown endpoint
  it('should return "Hello ALX!" for GET to an unknown endpoint', (done) => {
    process.argv = ['node', '5-http.js', path.join(__dirname, 'mock_database.csv')]; // Set a dummy database path
    request.get(`${BASE_URL}/unknown_path`, (error, response, body) => {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(200);
      expect(body).toBe('Hello ALX!');
      done();
    });
  });

  // Test case 5: Verify that `app` variable is exported
  it('should export the app variable', () => {
    // We already require it in beforeEach, just assert its type
    expect(require('./5-http')).toBeDefined();
    expect(typeof require('./5-http').listen).toBe('function');
  });
});
