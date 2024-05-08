// server.js

// Importar los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pais = require('./models/Pais'); // Importar el modelo de País
const Vuelos = require('./models/vuelos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://mateomina01:mateomina01@cluster0.fuhyb4u.mongodb.net/DB_viajes')
.then(() => console.log('Conexión a MongoDB establecida correctamente'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Ruta para buscar todos los países
app.get('/buscarPaises', async (req, res) => {
  try {
    const paises = await Pais.find();
    console.log('paises');
    console.log(paises);
    res.json(paises);
  } catch (error) {
    console.error('Error al buscar países:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/crearVuelo', async (req, res) => {
  try {
    const { lugarOrigen, lugarDestino } = req.body
    console.log(req.body);
    const allVuelos = await Vuelos.find();

    let reservaExistente = false;
    for (const reserva of allVuelos) {
      console.log(allVuelos);
        if (reserva.lugarOrigen === lugarOrigen && reserva.lugarDestino === lugarDestino) {
            reservaExistente = true;
            break;
        }
    }

    if (reservaExistente) {
        res.json('Ya existe')
    } else {
            const createReserva = await Vuelos.create(req.body);
            res.json(createReserva)
    }
  } catch (error) {
    console.error('Error al buscar países:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/obtenerVuelos', async (req, res) => {
  try {
    const vuelos = await Vuelos.find();
    res.json(vuelos);
  } catch (error) {
    console.error('Error al buscar países:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
