const express = require('express');
const ZipRequest = require('../models/schema');
const state = require('./state');
const zip = require('./zip');
const city = require('./city');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const data = await ZipRequest.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await ZipRequest.countDocuments();
    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    next(error);
  }
});

router.use('/state', state);
router.use('/zip', zip);
router.use('/city', city);

router.get('/:zip', async (req, res, next) => {
  try {
    const { zip_code } = req.params;
    const data = await ZipRequest.find({
      zip: zip_code
    }).exec();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
