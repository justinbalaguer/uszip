const mongoose = require('mongoose');

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

module.exports = ZipRequest;
