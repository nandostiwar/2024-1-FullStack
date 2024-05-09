//esquemas 
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  date: Date
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;