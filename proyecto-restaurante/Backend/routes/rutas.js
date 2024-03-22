const express = require('express');
const router = express.Router();
const restauranteControladores = require('./controladores/restau.js');
router
    .post('/consultarUsuario', restauranteControladores.consultarUsuario)

module.exports = router;