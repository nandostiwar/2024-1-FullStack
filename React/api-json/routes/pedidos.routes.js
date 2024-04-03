const express = require('express');
const router = express.Router();
const pedidosController = require('./controllers/pedidosController.js');
router
    .get('/', pedidosController.getAllpedido)
    .get('/:pedidos', pedidosController.getOnepedido)
    .patch('/:pedidosEditar', pedidosController.updatepedido)

module.exports = router;