const Pedido = require('../models/restaurantepedido');

const pedidoController = {};

pedidoController.guardarPedidos = async (req, res) => {
    try {
        const { username, mesa, producto, cantidad } = req.body;
        const nuevoPedido = new Pedido({ username, mesa, producto, cantidad, estado: 0 });
        
        await nuevoPedido.save();
        res.status(201).json({ message: 'Pedido creado con éxito', pedido: nuevoPedido });
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

pedidoController.obtenerListaPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

pedidoController.confirmarPedido = async (req, res) => {
    try {
        const { index } = req.params;
        const pedido = await Pedido.findById(index);

        if (!pedido) {
            return res.status(400).json({ message: 'Índice de pedido inválido' });
        }

        pedido.estado = 1;
        await pedido.save();
        
        res.json({ message: 'Pedido confirmado con éxito', pedido });
    } catch (error) {
        console.error('Error al confirmar el pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = pedidoController;
