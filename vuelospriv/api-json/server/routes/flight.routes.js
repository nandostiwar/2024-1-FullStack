const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');


// Rutas relativas a la API
router.post('/flights', flightController.createFlight);
router.get('/flights', flightController.getAllFlights);
router.get('/flights/:id', flightController.getFlightById);
router.put('/flights/:id', flightController.updateFlight);
router.delete('/flights/:id', flightController.deleteFlight);

module.exports = router;
