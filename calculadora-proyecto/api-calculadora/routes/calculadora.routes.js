const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/operaciones', calculadoraControllers.calcular)

module.exports = router;