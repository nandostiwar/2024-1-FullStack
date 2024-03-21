const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController.js');

// COM Restaurante

router
    .post('/auth', userController.authUser)
    .get('/getUsers', userController.getUsers)
    .post('/crateUser', userController.createUser)

module.exports = router;