const mongoose = require('mongoose');

const countriesSchema = new mongoose.Schema({
  name: String,
  code: String,
});

module.exports = mongoose.model('Countries', countriesSchema);