const Pedido = require("../../models/pedidos.js");

// Listar todos los pedidos
const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pedidos: " + error.message });
    }
};

// Agregar un nuevo pedido
const agregarPedido = async (req, res) => {
    try {
        const nuevoPedido = new Pedido(req.body);
        const pedidoGuardado = await nuevoPedido.save();
        res.status(201).json(pedidoGuardado);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el pedido: " + error.message });
    }
};

// Actualizar un pedido existente
const UpdatePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(id, req.body, { new: true });
        if (!pedidoActualizado) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el pedido: " + error.message });
    }
};

module.exports = {
    listarPedidos,
    agregarPedido,
    UpdatePedido
};
