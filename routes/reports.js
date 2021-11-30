// Imports
const express = require('express'); // Create router
const auth = require('../middleware/auth'); // Middleware
const { check, validationResult } = require('express-validator'); // Check and validate the inputs
const promisePool = require('../config/db'); // Import instance of mysql pool
const path = require('path');

// Init router
const router = express.Router();

// Endpoints
/**
 * Download injury report
 * Download injury template
 */

// @route   GET api/reports/downloadinjury/:id
// @desc    Download injury report
// @access  Private
router.get('/downloadinjury/:id', auth, async (req, res) => {
  const user_id = req.user_id;
  const rep_id = req.params.id;
  const file = path.join(__dirname, '../template.xlsx');

  res.download(file);
});

// @route   GET api/reports/injurytemplate
// @desc    Download injury template
// @access  Private
router.get('/injurytemplate', auth, async (req, res) => {
  const file = path.join(__dirname, '../template.xlsx');
  res.download(file);
});

module.exports = router;
