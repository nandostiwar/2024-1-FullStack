const express = require('express');
const router = express.Router();
const pedidoController = require('./controllers/pedidosController.js');
const pedidoController = require('./controllers/userController.js');
const pedidoController = require('./controllers/productoController.js');
router
    .get('/', pedidoController.getAllpedido)
    .get('/:pedidos', pedidoController.getOnepedido)
    .patch('/:editarEditar', pedidoController.updatepedido)

    .get('/', productoController.getAllproducto)
    .get('/:producto', productoController.getOneproducto)
    .patch('/:editarEditar', productoController.updproducto)

    .get('/', pedidoController.getAlluser)
    .get('/:user', pedidoController.getOneuser)
    .patch('/:editarEditar', pedidoController.updateuser)
module.exports = router;

