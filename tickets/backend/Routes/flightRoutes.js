const express = require('express');
const flightController = require('../Controllers/flightController');

const router = express.Router();

router.post('/tickets', flightController.createFlight); // Metodo POST
router.get('/tickets', flightController.getFlights); // Metodo GET

module.exports = router;