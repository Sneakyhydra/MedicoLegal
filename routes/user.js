// Imports
const express = require('express'); // Create router
const bcrypt = require('bcryptjs'); // Encrypt password
const jwt = require('jsonwebtoken'); // Authorization
const config = require('config'); // Global variables
const { check, validationResult } = require('express-validator'); // Check and validate the inputs
const promisePool = require('../config/db'); // Import instance of mysql pool

// Init router
const router = express.Router();

// Endpoints
/**
 * Register user
 */

// @route   POST api/user/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('user_email', 'email is required').isEmail(), // Check the email
    check(
      'user_password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }), // Check the password
    check('name', 'Name is required').not().isEmpty(),
    check('designation', 'Designation is required').not().isEmpty(),
    check('posting_place', 'Posting place is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract info from the body
    let { user_email, user_password, name, designation, posting_place } =
      req.body;

    try {
      // Check if user exists
      const [rows] = await promisePool.query(
        `SELECT EXISTS(SELECT * from logins WHERE user_email = "${user_email}" ) "EXISTS" FROM dual`
      );
      const result = rows[0].EXISTS;

      if (result) {
        // User already exists
        return res.status(400).json({ msg: 'User already exists' });
      } else {
        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        user_password = await bcrypt.hash(user_password, salt);

        // Add user details in the DB
        await promisePool.query(
          `INSERT INTO logins (user_email, user_password) VALUES ("${user_email}", "${user_password}")`
        );

        // Create payload for token
        const payload = {
          id: 0,
        };

        // Get user id
        const [rows] = await promisePool.query(
          `SELECT user_id from logins WHERE user_email='${user_email}'`
        );

        // Store user id in payload for token
        const user_id = rows[0].user_id;
        payload.id = user_id;

        // Add user details in the DB
        await promisePool.query(
          `INSERT INTO user_details (user_id, name, designation, posting_place) VALUES (${user_id}, "${name}", "${designation}", "${posting_place}")`
        );

        // Create a token
        const token = jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn: 21600,
        });

        // Create an httpOnly cookie
        res.cookie('token', token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV !== 'development',
          secure: false,
          maxAge: 6 * 60 * 60 * 1000,
        });

        // Send success message to the client
        res.send('Registered');
      }
    } catch (err) {
      // Catch errors
      throw err;
    }
  }
);

module.exports = router;
