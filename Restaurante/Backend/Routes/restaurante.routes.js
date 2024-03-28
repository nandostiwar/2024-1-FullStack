const express = require('express');
const router = express.Router();
const restaurant = require('../controllers/restaurant.js');
const usuarios =require('../db/usuarios.json');
const productos = require('../db/productos.json');
router
  .get('/usuarios', (req, res) => {
    try {
      res.status(200).json(usuarios.usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' })
    }
  })
  .get('/productos', (req, res) => {
        try {
          res.status(200).json(productos.productos); 
        } catch (error) {
          console.error('Error al obtener productos:', error);
          res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
      })


  .put('/usuarios/:id', restaurant.editarUsuario)
  .delete('/usuarios/:id', restaurant.eliminarUsuario)
  .delete('/productos/:id', restaurant.eliminarProducto)
  .put('/productos/:id/habilitar', restaurant.habilitarProducto)
  .get('/productos/:id', restaurant.obtenerProductos)

  
  .post('/productos',restaurant.editarProducto)

  .get('/pedidos', restaurant.obtenerPedidos) 
  .patch('/pedidos/:id', restaurant.editarEstadoPedido)
  



  .post('/pedidos', restaurant.crearPedido)
  .post('/login', restaurant.login)
  .post('/usuarios', restaurant.crearUsuario)
  .post('/productos', restaurant.crearProducto);

module.exports = router;