const mongoose = require('mongoose');

const pedido_esquema = new mongoose.Schema({
    username: String,
    mesa: String,
    producto: String,
    cantidad: String,
    estado: String
});

module.exports=mongoose.model('Pedido', pedido_esquema);