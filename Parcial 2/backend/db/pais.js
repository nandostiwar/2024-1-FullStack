
const mongoose = require('mongoose');
require("dotenv").config(); 

// Define el esquema del modelo de país
const paisSchema = new mongoose.Schema({
    name: String, 
    code: String
});


const Pais = mongoose.model('pais', paisSchema);




module.exports = Pais;
