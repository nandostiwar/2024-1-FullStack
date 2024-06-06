const mongoose = require('mongoose');

const usuario_esquema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

module.exports=mongoose.model('Usuario', usuario_esquema);