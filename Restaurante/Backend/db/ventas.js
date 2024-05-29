const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
mesero: { type: String, required: true },
productos: [
{
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true }
}
],
totalVentas: { type: Number, required: true }
}, { versionKey: false });

const Venta = mongoose.model('Venta', ventaSchema);

module.exports = Venta;