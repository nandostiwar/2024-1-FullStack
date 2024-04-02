const express = require('express');
const router = express.Router();
const restaurantController = require('./controllers/restaurantController.js');
const userController = require('./controllers/userController.js');

// restaurant
router.get('/', restaurantController.getRestaurant);

// users
router
    .patch('/login', userController.login)
    .get('/users', userController.getAllUsers)
    .get('/user/:userId', userController.getUser);

module.exports = router;