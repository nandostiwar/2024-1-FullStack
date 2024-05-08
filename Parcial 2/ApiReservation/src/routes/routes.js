const express = require("express");
const auth = require('../middleware/authMiddleware');
//const { getProtectedData } = require('./controllers/protectedController');
const paisesController = require('./controllers/paisesControllers');
const usuarioController = require('./controllers/userControllers');
const reservaController = require('./controllers/reservasControllers');



const router = express.Router();

//Rutas para Paises
router.get('/paises', paisesController.getPaises);
router.post('/paises', paisesController.createPaises);

//Rutas para usuarios
router.post('/Login', usuarioController.loginUser);
router.get('/users', auth, usuarioController.getUsers);
router.get('/users/:id', usuarioController.getUserid);
router.post('/users', usuarioController.createUser);
router.put('/users/:id', usuarioController.updateUser); // PUT o PATCH según tu implementación


// Rutas para reservaciones
router.get('/reservas', reservaController.listarReservas);
router.post('/reservas', reservaController.agregarReserva);
router.put('/reservas/:id', reservaController.UpdateReserva); // Para modificar detalles del pedido



module.exports = router;