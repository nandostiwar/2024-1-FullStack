// server.js

// Importar los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pais = require('./models/Pais'); // Importar el modelo de País

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://mateomina01:mateomina01@cluster0.fuhyb4u.mongodb.net/DB_viajes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB establecida correctamente'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Ruta para buscar todos los países
app.get('/buscarPaises', async (req, res) => {
  try {
    const paises = await Pais.find();
    res.json(paises);
  } catch (error) {
    console.error('Error al buscar países:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
