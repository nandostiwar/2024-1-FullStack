const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importación de rutas
const flightRoutes = require('./Routes/flightRoutes');
const countrieRoutes = require('./Routes/countrieRoutes');

// Importar la conexión a MongoDB desde el archivo db.js
const dbConnection = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;



// Conexión MongoDB
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function () {
  console.log("API ready to work");
});

//Rutas
app.use(flightRoutes);
app.use(countrieRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/flights`);
});