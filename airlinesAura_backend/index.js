const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const flightRoutes = require('./Routes/flightRoutes');
const countrieRoutes = require('./Routes/countrieRoutes');

// Import db.js
const dbConnection = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connection MongoDB
dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function () {
  console.log("API ready to work");
});

//Rotes
app.use('/api', flightRoutes);
app.use('/api', countrieRoutes);

// Control errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/flights`);
});