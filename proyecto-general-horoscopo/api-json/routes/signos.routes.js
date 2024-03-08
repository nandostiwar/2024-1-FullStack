const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');

// Obtener signos 
router.get('/', signoController.getAllSignos)

// Obtener signo por tipo
router.get('/:tipo/:signo', signoController.ObtenerSignoPorTipo)

// Actualizar signo
router.patch('/:signoEditar', signoController.updateSigno)

module.exports = router;