const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController.js');
const dishesController = require('./controllers/dishesController.js');

// COM Restaurante

router
    .post('/auth', userController.authUser)
    .get('/getUsers', userController.getUsers)
    .post('/crateUser', userController.createUser)
    .post('/newDish', dishesController.newDish)

module.exports = router;