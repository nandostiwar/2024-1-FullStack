const Usuario = require('../models/restauranteusuarios'); // Ajusta la ruta según tu estructura de proyecto

const usuarioController = {};

usuarioController.guardarUsuario = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const nuevoUsuario = new Usuario({ username, password, role });

        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario guardado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = usuarioController;
