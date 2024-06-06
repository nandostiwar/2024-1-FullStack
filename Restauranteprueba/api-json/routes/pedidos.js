const express = require('express');
const router = express.Router();
const pedidos = require('../controllers/pedidosController');

router.post('/crearPedido', pedidos.guardarPedidos);
router.get('/listaPedidos', pedidos.obtenerListaPedidos);
router.put('/confirmarPedido/:index', pedidos.confirmarPedido); // Corrección aquí

module.exports = router;