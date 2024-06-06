const express = require('express');
const router = express.Router();
const producto = require('../controllers/productosController');

router.post('/crearProducto', producto.guardarProducto);
router.get('/listaProductos', producto.obtenerListaProductos);
router.get('/todosProductos', producto.verTodosProductos);

module.exports = router;
