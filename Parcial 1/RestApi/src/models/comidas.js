const mongoose = require('mongoose');

const comidaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        get: v => (v / 100).toFixed(2), // Convertir a formato decimal
        set: v => v * 100,             // Asumiendo que el precio se guarda en centavos
        min: [0, 'El precio no puede ser negativo']  // Validación para asegurar que el precio no sea negativo
    },
    imageUrl: { type: String, required: true },
    categoria: { type: String, required: true, enum: ['Comida', 'Bebida']},
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'], // Asumiendo que los estados posibles son 'Activo' e 'Inactivo'
        default: 'Activo'
    }
});

// Crear un modelo a partir del esquema
const Comida = mongoose.model('COMIDAS', comidaSchema);

module.exports = Comida;
