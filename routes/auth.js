// Imports
const express = require('express'); // Create router
const bcrypt = require('bcryptjs'); // Encrypt password
const jwt = require('jsonwebtoken'); // Authorization
const config = require('config'); // Global variables
const auth = require('../middleware/auth'); // Middleware
const { check, validationResult } = require('express-validator'); // Check and validate the inputs
const promisePool = require('../config/db'); // Import instance of mysql pool

// Init router
const router = express.Router();

// Endpoints
/**
 * Get logged in user
 * Login
 * Delete cookie / logout
 * Validate user
 */

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  // Extract user id from req
  const user_id = req.user_id;

  try {
    // Get user from database
    const [rows] = await promisePool.query(
      `SELECT * from user_details WHERE user_id='${user_id}'`
    );

    const user = {
      name: rows[0].name,
      designation: rows[0].designation,
      posting_place: rows[0].posting_place,
    };

    res.send(user);
  } catch (err) {
    // Catch errors
    throw err;
  }
});

// @route   POST api/auth
// @desc    Authorize user and get token
// @access  Public
router.post(
  '/',
  [
    check('user_email', 'email is required').notEmpty(), // Check email
    check('user_password', 'Password is required').exists(), // Check password
  ],
  async (req, res) => {
    // Check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract userEmail and password from the body
    const userEmail = req.body.user_email;
    const password = req.body.user_password;

    try {
      // Check if the user exists
      const [existence] = await promisePool.query(
        `SELECT EXISTS(SELECT * from logins WHERE user_email= "${userEmail}" ) 'EXISTS' FROM dual`
      );

      // Extract the bool
      const result = existence[0].EXISTS;

      // Check if result is false
      if (!result) {
        // User doesn't exist
        return res.status(400).json({ msg: 'Invalid Credentials' });
      } else {
        // Get user details from DB
        const [rows] = await promisePool.query(
          `SELECT * from logins WHERE user_email='${userEmail}'`
        );

        // Extract the user_id and user_password from the rows
        const { user_id, user_password } = rows[0];

        // Check the password
        const isMatch = await bcrypt.compare(password, user_password);

        if (!isMatch) {
          // Password doesn't match
          return res.status(400).json({ msg: 'Invalid Credentials' });
        } else {
          // Store user_id in payload for token
          const payload = {
            id: user_id,
          };

          // Create a token
          const token = jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 21600,
          });

          // Store the token in an httpOnly cookie
          res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 6 * 60 * 60 * 1000,
          });

          // Send success message to client
          res.send('Logged in');
        }
      }
    } catch (err) {
      // Catch errors
      throw err;
    }
  }
);

// @route   DELETE api/auth
// @desc    Delete cookie
// @access  Private
router.delete('/', auth, async (req, res) => {
  // Delete the cookie
  res.clearCookie('token');

  // Send success message to client
  res.send('Logged out');
});

// @route   GET api/auth/check
// @desc    Validate user
// @access  Private
router.get('/check', async (req, res) => {
  // Get token from cookies
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    res.clearCookie('token');
    res.send('No token');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    res.send('Valid');
  } catch (err) {
    console.log('Invalid');
  }
});

module.exports = router;
