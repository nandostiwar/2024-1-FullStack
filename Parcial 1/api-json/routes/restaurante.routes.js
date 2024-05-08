const express = require('express');
const router = express.Router();

// Supongamos que tienes controladores separados para manejar lógica de comidas, bebidas, usuarios y pedidos
const comidaController = require('./controllers/comidaController');
const bebidaController = require('./controllers/bebidaController');
const usuarioController = require('./controllers/usuarioController');
const pedidoController = require('./controllers/pedidoController');

// Rutas para comidas
router.get('/comidas', comidaController.listFood);
router.post('/comidas', comidaController.createFood);
router.put('/comidas/:id', comidaController.updateFood); // PUT o PATCH según tu implementación

// Rutas para bebidas
router.get('/bebidas', bebidaController.listDrinks);
router.post('/bebidas', bebidaController.createDrinks);
router.put('/bebidas/:id', bebidaController.updatedrinks); // PUT o PATCH según tu implementación

// Rutas para usuarios
router.post('/Login', usuarioController.loginUser)
router.get('/usuarios', usuarioController.getUsers);
router.get('/usuarios/:id', usuarioController.getUserid);
router.post('/usuarios', usuarioController.createUser);
router.put('/usuarios/:id', usuarioController.updateUser); // PUT o PATCH según tu implementación
router.delete('/usuarios/:id', usuarioController.deleteUser);

// Rutas para pedidos
router.get('/pedidos', pedidoController.listarPedidos);
router.post('/pedidos', pedidoController.agregarPedido);
router.put('/pedidos/:id', pedidoController.cambiarEstadoPedido); // Para modificar detalles del pedido
//router.patch('/pedidos/:id', pedidoController.actualizarEstadoPedido); // Para cambiar el estado, si es necesario*/

module.exports = router;
