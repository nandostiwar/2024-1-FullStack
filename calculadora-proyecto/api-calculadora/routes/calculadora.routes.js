const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/calcular', calculadoraControllers.calcular)

module.exports = router;