const mongoose = require('mongoose');
const Producto = require('../db/productos'); 

const pedidoSchema = new mongoose.Schema({
    mesa: { type: String, required: true },
    mesero: { type: String, required: true },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Producto',
          required: true
        },
        cantidad: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    estado: { type: String, required: true }
  }, { versionKey: false });
  
  const Pedido = mongoose.model('Pedido', pedidoSchema);
  
  module.exports = Pedido;
