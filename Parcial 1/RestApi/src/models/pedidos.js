const mongoose = require('mongoose');

const itemPedidoSchema = new mongoose.Schema({
    idcomida: { type: String, required: true },
    nombrecomida: { type: String, required: true },
    tipo: { type: String, required: true, enum: ['Comida', 'Bebida'] }, // Limita el tipo a 'Comida' o 'Bebida'
    cantidad: { type: Number, required: true, min: 1 }, // Asegura que la cantidad sea al menos 1
    comentario: { type: String, default: '' },
    precioUnitario: {
        type: Number,
        required: true,
        min: [0, 'El precio unitario no puede ser negativo'] // Valida que el precio no sea negativo
    }
});

const pedidoSchema = new mongoose.Schema({
    idMesa: { type: Number, required: true },
    idmesero: { type: String, required: true },
    cosinero:{type: String, default: ''},
    items: [itemPedidoSchema], // Array de items utilizando el esquema definido arriba
    fecha: { type: Date, required: true },
    total: {
        type: Number,
        required: true,
        get: v => (v / 100).toFixed(3), // Convertir a formato decimal
        set: v => v * 100,             // Asumiendo que el total se guarda en centavos
        min: [0, 'El total no puede ser negativo'] // Valida que el total no sea negativo
    },
    estado: {
        type: String,
        required: true,
        enum: ['Listo', 'En preparación', 'Servido', 'Cancelado'], // Estados posibles del pedido
        default: 'En preparación'
    }
});

// Crear un modelo a partir del esquema
const Pedido = mongoose.model('PEDIDOS', pedidoSchema);

module.exports = Pedido;
