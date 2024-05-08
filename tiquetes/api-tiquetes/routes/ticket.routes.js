const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController.js');

// users
router.get('/dashboard', userController.getAllUsers);

module.exports = router;