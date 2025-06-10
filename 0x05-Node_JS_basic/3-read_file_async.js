#!/usr/bin/env node
const fs = require('fs').promises; // Import the Promise-based version of Node.js file system module

/**
 * Counts the number of students from a CSV database file asynchronously.
 * Logs the total number of students and the number of students per field,
 * along with a list of their first names.
 *
 * @param {string} path The path to the CSV database file.
 * @returns {Promise<void>} A Promise that resolves if the database is processed successfully,
 * or rejects with an Error if the file cannot be loaded.
 */
async function countStudents(path) {
  try {
    // Attempt to read the database file asynchronously
    // await ensures the Promise resolves before proceeding
    const data = await fs.readFile(path, 'utf8');

    // Split the data into lines and filter out empty lines (especially trailing ones)
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Check if there are actual student data lines after filtering out header and empty lines
    if (lines.length <= 1) { // Only header or no data lines
      console.log('Number of students: 0');
      return; // Resolve the promise implicitly by not throwing
    }

    // Extract the header (first line) to identify column indices
    const header = lines[0].split(',');
    const firstnameIndex = header.indexOf('firstname');
    const fieldIndex = header.indexOf('field');

    // Ensure 'firstname' and 'field' columns exist
    if (firstnameIndex === -1 || fieldIndex === -1) {
      throw new Error('Database header is missing required columns (firstname, field)');
    }

    // Process each student data line
    const studentByField = {};
    for (let i = 1; i < lines.length; i += 1) { // Start from the second line to skip header
      const studentData = lines[i].split(',');
      const firstname = studentData[firstnameIndex].trim();
      const field = studentData[fieldIndex].trim();

      // Aggregate students by their field
      if (!studentByField[field]) {
        studentByField[field] = [];
      }
      studentByField[field].push(firstname);
    }

    const totalStudents = lines.length - 1; // Subtract 1 for the header line
    console.log(`Number of students: ${totalStudents}`);

    // Log students per field
    for (const field in studentByField) {
      // Check if property is directly on object, not prototype chain
      if (Object.prototype.hasOwnProperty.call(studentByField, field)) {
        const count = studentByField[field].length;
        const list = studentByField[field].join(', ');
        console.log(`Number of students in ${field}: ${count}. List: ${list}`);
      }
    }
    // The Promise implicitly resolves here if no error is thrown
  } catch (error) {
    // If any error occurs during file reading or processing, reject the Promise
    // If it's the file not found error, use the specified message
    if (error.code === 'ENOENT') {
      throw new Error('Cannot load the database');
    }
    // Re-throw other errors
    throw error;
  }
}

module.exports = countStudents;
