// Imports
const express = require('express'); // Create router
const bcrypt = require('bcryptjs'); // Encrypt password
const auth = require('../middleware/auth'); // Middleware
const { check, validationResult } = require('express-validator'); // Check and validate the inputs
const promisePool = require('../config/db'); // Import instance of mysql pool

// Init router
const router = express.Router();

// Endpoints
/**
 * Injury Form
 * Get injury reports
 */

// @route   POST api/forms/injury
// @desc    Submit injury form
// @access  Private
router.post(
  '/injury',
  [
    auth,
    check('p_name', 'Patient name is required').notEmpty(),
    check('swo', 'S/W/O is required').notEmpty(),
    check('p_age', 'Patient age is required').notEmpty(),
    check('p_address', 'Patient address is required').notEmpty(),
    check('brought_by', 'Brought by is required').notEmpty(),
    check('id_mark', 'Id Mark is required').notEmpty(),
    check('history', 'History is required').notEmpty(),
    check('opinion', 'Opinion is required').notEmpty(),
    check('place', 'Place is required').notEmpty(),
    check('rep_type', 'Rep Type is required').notEmpty(),
    check('injuries', 'Atleast 1 injury is required').isLength({ min: 1 }),
  ],
  async (req, res) => {
    // Check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the errors
      return res.status(400).json({ errors: errors.array() });
    }

    const user_id = req.user_id;

    const {
      p_name,
      swo,
      p_age,
      p_address,
      brought_by,
      id_mark,
      history,
      opinion,
      place,
      rep_date,
      rep_time,
      rep_type,
      injuries,
    } = req.body;

    let date = new Date();
    let rep_date_time =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      rep_time;

    console.log(rep_date);
    console.log(rep_time);

    await promisePool.query(
      `INSERT INTO reports (user_id, p_name, swo, p_age, p_address, brought_by, id_mark, history, opinion, place, rep_date, rep_time, rep_type, createDateTime) VALUES (${user_id}, "${p_name}","${swo}",${p_age},"${p_address}","${brought_by}","${id_mark}","${history}","${opinion}","${place}","${rep_date}","${rep_time}","${rep_type}", "${rep_date_time}")`
    );

    const [row] = await promisePool.query(
      `SELECT rep_id FROM reports WHERE (user_id=${user_id} AND p_name="${p_name}" AND swo="${swo}" AND p_age=${p_age} AND p_address="${p_address}" AND brought_by="${brought_by}" AND id_mark="${id_mark}" AND history="${history}" AND opinion="${opinion}" AND place="${place}" AND rep_date="${rep_date}" AND rep_time="${rep_time}" AND rep_type="${rep_type}" AND createDateTime="${rep_date_time}")`
    );

    const rep_id = row[0].rep_id;

    for (let i = 0; i < injuries.length; i++) {
      const { type, size, location, object, nature, duration } = injuries[i];

      await promisePool.query(
        `INSERT INTO injuries (rep_id, type, size, location, object, nature, duration) VALUES
            (${rep_id}, "${type}", "${size}", "${location}","${object}","${nature}","${duration}")`
      );
    }

    res.send('Submitted successfully');
  }
);

// @route   GET api/forms/injury
// @desc    Get injury reports
// @access  Private
router.get('/injury', auth, async (req, res) => {
  const user_id = req.user_id;

  const [rows] = await promisePool.query(
    `SELECT * FROM reports WHERE user_id=${user_id} AND rep_type="injury"`
  );

  let reports = [...rows];

  for (let i = 0; i < reports.length; i++) {
    const [inj] = await promisePool.query(
      `SELECT * FROM injuries WHERE rep_id=${reports[i].rep_id}`
    );

    reports[i].injuries = inj;
  }

  res.send(reports);
});

module.exports = router;
