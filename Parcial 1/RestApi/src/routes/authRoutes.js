const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users.js'); // Asegúrate de tener el path correcto al modelo

router.post('/login', async (req, res) => {
    // Buscar al usuario por su nombre de usuario
    const { usuario, password } = req.body;
    const user = await User.findOne({ usuario });

    if (!user) {
        return res.status(401).send('Usuario no encontrado');
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send('Contraseña incorrecta');
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id, rol: user.rol }, 'tuSecretKey', { expiresIn: '1h' });

    res.send({ token });
});

module.exports = router;
