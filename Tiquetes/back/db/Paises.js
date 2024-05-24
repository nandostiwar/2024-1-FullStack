const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({ //se define un esquema para la colección Paises
  name: String,
  code: String
});

const Pais = mongoose.model('Paises', paisSchema);

module.exports = Pais;
