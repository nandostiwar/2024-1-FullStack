const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    rol: {
        type: String,
        required: true,
        enum: ['Admin', 'Mesero','Cosinero'], // Asumiendo que solo hay roles de 'Admin' y 'Usuario'
        default: 'Admin'
    },
    usuario: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'], // Asumiendo que los estados posibles son 'Activo' e 'Inactivo'
        default: 'Activo'
    }
});

// Crear un modelo a partir del esquema
const Usuarios = mongoose.model('USUARIOS', usuarioSchema);

module.exports = Usuarios;