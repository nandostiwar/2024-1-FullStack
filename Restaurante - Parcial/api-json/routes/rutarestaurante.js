const express = require('express');
const router = express.Router();
const restauranteeditar = require('./controllers/controlrestaurante.js');
router

    .patch('/:restauranteeditar', restauranteeditar.AdminPanel)

module.exports = router;