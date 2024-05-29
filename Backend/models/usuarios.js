const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario",{
    id:Number,
    username:String,
    rol:String,
    password:String
})


module.exports = Usuario;