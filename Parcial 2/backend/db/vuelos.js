
const mongoose = require('mongoose');
require("dotenv").config(); 

const vueloSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    date: Date
});


const Vuelo = mongoose.model('Vuelo', vueloSchema);



module.exports = Vuelo;
