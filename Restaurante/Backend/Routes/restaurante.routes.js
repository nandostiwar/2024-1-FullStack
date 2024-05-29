const express = require('express');
const router = express.Router();
const restaurant = require('../controllers/restaurant.js');



const Usuario =require('../db/usuarios.js');
const Producto = require ('../db/productos.js');
const Pedido= require('../db/pedidos.js');
const Venta= require('../db/ventas.js');
router
  .get('/usuarios', async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' })
    }
  })

  .get('/productos', async (req, res) => {
    try {
      const productos = await Producto.find();
      res.status(200).json(productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' })
    }
  })
  
  
  
  .get('/ventasVer', restaurant.obtenerVentas)
  .post('/ventas', restaurant.agregarVenta)
  


  //Rutas para solicitudes de usuario
  .post('/login', restaurant.login)
  .post('/usuarios', restaurant.crearUsuario)
  .put('/usuarios/:id', restaurant.editarUsuario)
  .delete('/usuarios/:id', restaurant.eliminarUsuario)

  //Rutas para solicitudes de productos
  .get('/productos/:id', restaurant.obtenerProductos)
  .post('/productos/crear',restaurant.crearProducto)
  .put('/productos/:id',restaurant.editarProducto)
  .delete('/productos/:id', restaurant.eliminarProducto)  

  //Rutas para solicitudes de pedidos
  .get('/pedidos', restaurant.obtenerPedidos)
  .post('/pedidos', restaurant.crearPedido)
  .patch('/pedidos/:id', restaurant.editarEstadoPedido);


  

module.exports = router;