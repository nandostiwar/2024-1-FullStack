const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
router
    //usuarios
    .post('/usuario', signoController.registrarUsuarios)
    .get('/usuarios', signoController.consultaUsuarios)
    .post('/usuarios', signoController.consultaUsuarios)
    .get('/verusuarios', signoController.consultaTodosUsuarios)

    //productos
    .post('/crearproduc', signoController.registrarProductos)
    .get('/consulproduc', signoController.consultaProductos)

    //pedidos
    .post('/pedidos', signoController.registrarPedidos)
    .get('/verpedidos', signoController.consultaPedidos)
module.exports = router;