const mongoose = require('mongoose');
const Ventas = mongoose.model("Ventas",{
    mesero:String,
    producto:String,
    totalVentas:Number
})
module.exports = Ventas;