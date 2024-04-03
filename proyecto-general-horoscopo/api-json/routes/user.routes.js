const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController.js');
router
    .get('/', userController.getAlluser)
    .get('/:user', userController.getOneuser)
    .patch('/:userEditar', userController.updateuser)

module.exports = router;