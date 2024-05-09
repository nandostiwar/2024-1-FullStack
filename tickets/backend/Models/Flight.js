const mongoose = require('mongoose');

const ticketsSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  day: String
});

module.exports = mongoose.model('ticket', ticketsSchema);