const express = require('express');
const router = express.Router();
const restauranteControladores = require('./controladores/restau.js');
router
    .post('/consultarUsuario', restauranteControladores.consultarUsuario)
    .get('/productosOb', restauranteControladores.obtenerProductos)
    .post('/productosAg', restauranteControladores.agregarProducto)
    // .put('/productos/:id', restauranteControladores.actualizarProducto);
    // .delete('/productos/:id', restauranteControladores.eliminarProducto);

module.exports = router;