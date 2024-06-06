const mongoose = require('mongoose');

const producto_esquema = new mongoose.Schema({
    nombre: String,
    precio: String
});

module.exports=mongoose.model('Producto', producto_esquema);