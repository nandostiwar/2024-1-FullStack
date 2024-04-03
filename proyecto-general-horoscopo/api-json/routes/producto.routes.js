const express = require('express');
const router = express.Router();
const productoController = require('./controllers/productoController.js');
router
    .get('/', productoController.getAllproducto)
    .get('/:producto', productoController.getOneproducto)
    .patch('/:productoEditar', productoController.updateproducto)

module.exports = router;