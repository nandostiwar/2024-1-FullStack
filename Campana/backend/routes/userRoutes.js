// /routes/userRoutes.js
const express = require('express');
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

// Ruta para registrar usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

module.exports = router;
