// full_server/controllers/StudentsController.js
import readDatabase from '../utils';

class StudentsController {
  /**
   * Handles GET requests to '/students'.
   * Displays a list of all students grouped by field.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  static async getAllStudents(req, res) {
    const databasePath = process.argv[2]; // Get database path from command line arg

    try {
      const studentsByField = await readDatabase(databasePath);
      let responseText = 'This is the list of our students\n';

      // Get fields in alphabetical order (case-insensitive)
      const fields = Object.keys(studentsByField).sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );

      for (const field of fields) {
        const studentNames = studentsByField[field];
        responseText += `Number of students in ${field}: ${studentNames.length}. List: ${studentNames.join(', ')}\n`;
      }

      res.status(200).send(responseText.trim()); // trim() to remove trailing newline
    } catch (error) {
      res.status(500).send(error.message); // Send error message if database not available
    }
  }

  /**
   * Handles GET requests to '/students/:major'.
   * Displays a list of students for a specific major.
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  static async getAllStudentsByMajor(req, res) {
    const databasePath = process.argv[2]; // Get database path from command line arg
    const { major } = req.params;

    if (!major || (major !== 'CS' && major !== 'SWE')) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const studentsByField = await readDatabase(databasePath);

      if (!studentsByField[major]) {
        // If major exists but has no students, return empty list
        return res.status(200).send(`List:`);
      }

      const studentNames = studentsByField[major];
      res.status(200).send(`List: ${studentNames.join(', ')}`);
    } catch (error) {
      res.status(500).send(error.message); // Send error message if database not available
    }
  }
}

export default StudentsController;

