const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
const restauranteController = require('./controllers/restauranteController.js');
router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .patch('/:signoEditar', signoController.updateSigno)

    // Restaurante
    .get('validarUsuario', restauranteController.validarUsuario)

module.exports = router;