// models/Pais.js

const mongoose = require('mongoose');

// Definir el esquema para el modelo de país
const paisSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  // Otros campos si los tienes
});

// Crear el modelo de país utilizando el esquema definido
const Pais = mongoose.model('Pais', paisSchema, 'coll_paises');

module.exports = Pais;

