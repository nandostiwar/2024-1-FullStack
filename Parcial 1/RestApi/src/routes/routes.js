const express = require("express");
const auth = require('../middleware/authMiddleware');
//const { getProtectedData } = require('./controllers/protectedController');
const comidaController = require('./controllers/comidaController');
const usuarioController = require('./controllers/usuarioController');
const pedidoController = require('./controllers/pedidoController');



const router = express.Router();

//Rutas para comidas
router.get('/foods', comidaController.listFood);
router.post('/createfood', comidaController.createFood);
router.put('/food/:id', comidaController.updateFood); // PUT o PATCH según tu implementación

// Rutas para usuarios
router.post('/Login', usuarioController.loginUser)
router.get('/users', auth, usuarioController.getUsers);
router.get('/users/:id', usuarioController.getUserid);
router.post('/users', usuarioController.createUser);
router.put('/users/:id', usuarioController.updateUser); // PUT o PATCH según tu implementación
//router.delete('/users/:id', usuarioController.deleteUser);

// Rutas para pedidos
router.get('/pedidos', pedidoController.listarPedidos);
router.post('/pedidos', pedidoController.agregarPedido);
router.put('/pedidos/:id', pedidoController.UpdatePedido); // Para modificar detalles del pedido



module.exports = router;
