const Producto = require('../models/restauranteproducto'); // Ajusta la ruta según tu estructura de proyecto

const productoController = {};

productoController.guardarProducto = async (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const nuevoProducto = new Producto({ nombre, precio });

        await nuevoProducto.save();
        res.status(201).json({ message: 'Producto guardado exitosamente', producto: nuevoProducto });
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

productoController.obtenerListaProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        const listaProductos = productos.map(producto => producto.nombre);
        res.json(listaProductos);
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

productoController.verTodosProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = productoController;