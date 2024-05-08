const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del schema para un país
const countrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

// Creación del modelo basado en el schema definido
const Paises = mongoose.model('Paises', countrySchema);

module.exports = Paises;
