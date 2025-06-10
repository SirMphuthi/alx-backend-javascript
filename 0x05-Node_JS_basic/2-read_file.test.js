const countStudents = require('./2-read_file');
const fs = require('fs');
const path = require('path');
const sinon = require('sinon'); // For mocking console.log and process.exit

describe('countStudents', () => {
  let consoleSpy;
  let exitSpy;

  // Before each test, mock console.log and process.exit
  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
    exitSpy = sinon.spy(process, 'exit'); // Spy on process.exit
  });

  // After each test, restore the original functions
  afterEach(() => {
    consoleSpy.restore();
    exitSpy.restore(); // Restore process.exit
  });

  // Test case 1: Database file does not exist
  it('should throw an error if the database file is not available', () => {
    const invalidPath = 'nonexistent.csv';
    expect(() => countStudents(invalidPath)).toThrow('Cannot load the database');
    expect(consoleSpy.called).toBe(false); // No console output expected
  });

  // Test case 2: Database file exists and has data
  it('should log student statistics for a valid database file', () => {
    // Create a mock database.csv for testing
    const dbPath = path.join(__dirname, 'test_database.csv');
    const mockData = `firstname,lastname,age,field
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
    fs.writeFileSync(dbPath, mockData);

    countStudents(dbPath);

    // Verify console output
    expect(consoleSpy.callCount).toBe(3); // Total students + 2 fields
    expect(consoleSpy.calledWith('Number of students: 10')).toBe(true);
    expect(consoleSpy.calledWith('Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie')).toBe(true);
    expect(consoleSpy.calledWith('Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy')).toBe(true);
    expect(exitSpy.called).toBe(false); // Function should not call process.exit()
    fs.unlinkSync(dbPath); // Clean up mock file
  });

  // Test case 3: Database file exists but is empty or only has header
  it('should log 0 students if the database file is empty or only has header', () => {
    const emptyDbPath = path.join(__dirname, 'empty_database.csv');
    fs.writeFileSync(emptyDbPath, 'firstname,lastname,age,field\n'); // Only header

    countStudents(emptyDbPath);

    expect(consoleSpy.callCount).toBe(1);
    expect(consoleSpy.calledWith('Number of students: 0')).toBe(true);
    fs.unlinkSync(emptyDbPath); // Clean up mock file
  });
});
