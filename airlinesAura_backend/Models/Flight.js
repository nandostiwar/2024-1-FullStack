const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  day: String
});

module.exports = mongoose.model('Flight', flightSchema);