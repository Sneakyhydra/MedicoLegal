// Imports
const express = require('express'); // Create router
const auth = require('../middleware/auth'); // Middleware
const promisePool = require('../config/db'); // Import instance of mysql pool

const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');

// Init router
const router = express.Router();

// Endpoints
/**
 * Download injury template
 * Download injury report
 */

// @route   GET api/reports/injurytemplate
// @desc    Download injury template
// @access  Private
router.get('/injurytemplate', auth, async (req, res) => {
  const file = path.join(__dirname, '../template.docx');
  res.download(file);
});

// @route   GET api/reports/downloadinjury/:id
// @desc    Download injury report
// @access  Private
router.get('/downloadinjury/:id', auth, async (req, res) => {
  const user_id = req.user_id;
  const rep_id = req.params.id;

  try {
    const [user] = await promisePool.query(
      `SELECT * FROM user_details WHERE user_id=${user_id}`
    );

    const [report] = await promisePool.query(
      `SELECT * FROM reports WHERE rep_id=${rep_id} AND user_id=${user_id}`
    );

    const [injuries] = await promisePool.query(
      `SELECT * FROM injuries WHERE rep_id=${rep_id}`
    );

    const { name, designation, posting_place } = user[0];

    let {
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
    } = report[0];

    rep_date = rep_date.toISOString().slice(0, 10);

    const content = fs.readFileSync(
      path.join(__dirname, '../template.docx'),
      'binary'
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      p_name: p_name,
      swo: swo,
      p_age: p_age,
      p_address: p_address,
      brought_by: brought_by,
      id_mark: id_mark,
      history: history,
      injuries: injuries,
      opinion: opinion,
      place: place,
      date: rep_date,
      time: rep_time,
      d_name: name,
      designation: designation,
      p_place: posting_place,
    });

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    fs.writeFileSync(path.resolve(__dirname, `../${user_id}.docx`), buf);

    const file = path.join(__dirname, `../${user_id}.docx`);

    res.download(file);

    setTimeout(() => {
      fs.unlink(file, (err) => {
        if (err) {
          throw err;
        }

        console.log('File is deleted.');
      });
    }, 60000);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
