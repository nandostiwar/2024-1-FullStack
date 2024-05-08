const mongoose = require('mongoose');
const { Schema } = mongoose;

// Crear un esquema para el vuelo
const vueloSchema = new Schema({
  origen: {
    pais: { type: String, required: true }
  },
  destino: {
    pais: { type: String, required: true }
  },
  fecha: { type: Date, required: true },
  precio: { type: Number, required: true }
});

// Creación del modelo basado en el schema definido
const Reservation = mongoose.model('Reservaciones', vueloSchema);

module.exports = Reservation;

