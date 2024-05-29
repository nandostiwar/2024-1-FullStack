const mongoose = require('mongoose');
const Producto = mongoose.model("Producto",{
    id:Number,
    nombre:String,
    precio:String
})
module.exports = Producto;