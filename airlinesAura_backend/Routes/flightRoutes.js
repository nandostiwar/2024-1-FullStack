const express = require('express');
const flightController = require('../Controllers/flightController');

const router = express.Router();

router.post('/flights/create', flightController.createFlight);
router.get('/flights', flightController.getFlights);

module.exports = router;