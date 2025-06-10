import fs from 'fs/promises'; // Use fs.promises for async file operations

/**
 * Reads the student database file and returns an object
 * containing arrays of first names grouped by their field (major).
 *
 * @param {string} filePath The path to the database CSV file.
 * @returns {Promise<Object<string, string[]>>} A promise that resolves to an object
 * where keys are fields (e.g., 'CS', 'SWE') and values are arrays of student first names.
 * Rejects with an error if the file cannot be read.
 */
async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length === 0) {
      // Even if file exists, if it's empty, treat as no data
      return {};
    }

    const header = lines[0].split(',');
    const firstnameIndex = header.indexOf('firstname');
    const fieldIndex = header.indexOf('field');

    if (firstnameIndex === -1 || fieldIndex === -1) {
      throw new Error('Required columns (firstname, field) not found in database header');
    }

    const studentsByField = {};
    for (let i = 1; i < lines.length; i += 1) { // Skip header
      const studentData = lines[i].split(',');
      const firstname = studentData[firstnameIndex].trim();
      const field = studentData[fieldIndex].trim();

      if (field) { // Ensure field is not empty
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstname);
      }
    }
    return studentsByField;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

export default readDatabase;

