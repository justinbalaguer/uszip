const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { Schema } = mongoose;

const zipSchema = new Schema({
  zip: String,
  primary_city: String,
  state: String,
  area_codes: String,
  country: String,
  latitude: String,
  longiture: String
});

const ZipRequest = mongoose.model('ZipReqest', zipSchema, 'zip');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

router.get('/:zip', async (req, res, next) => {
  try {
    const { zip } = req.params;
    const data = await ZipRequest.find({
      zip: zip
    }).exec();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
