const express = require('express');
const router = express.Router();
const { postuser, registrarUsuarios, getAlluser, getOneuser, updateuser } = require('./controllers/userController');

// Endpoint para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { id, correo, contraseña, rol, activate } = req.body;
    try {
        const nuevoUsuario = await postuser(id, correo, contraseña, rol, activate);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Endpoint para registrar usuarios
router.post('/registrar', registrarUsuarios);

// Endpoint para obtener todos los usuarios
router.get('/all', getAlluser);

// Endpoint para obtener un usuario específico
router.get('/:user', getOneuser);

// Endpoint para actualizar un usuario
router.put('/:userEditar', updateuser);

module.exports = router;
