const express = require('express');
const ZipRequest = require('../models/schema');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await ZipRequest.find().distinct('primary_city');
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
