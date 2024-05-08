const express = require('express');
const { urlencoded, json } = require('express');
const vuelosrouter = require('./routes/vuelos.routes');
const cors = require('cors');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());

// Usa las rutas de vuelos
app.use('/api/vuelos', vuelosrouter);

mongoose.connect(process.env.direccion)
  .then(() => console.log('Conexión de base de datos establecida'))
  .catch((error) => console.error(error));

app.listen(3000, () => {
  console.log('Escuchando en el puerto 3000');
});
