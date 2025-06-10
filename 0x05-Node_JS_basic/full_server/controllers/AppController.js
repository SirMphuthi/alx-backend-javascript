// full_server/controllers/AppController.js
class AppController {
  /**
   * Handles GET requests to the homepage ('/').
   * Responds with a 200 status and "Hello ALX!".
   * @param {object} req - The Express request object.
   * @param {object} res - The Express response object.
   */
  static getHomepage(req, res) {
    res.status(200).send('Hello ALX!');
  }
}

export default AppController;

