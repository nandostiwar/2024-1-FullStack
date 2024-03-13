const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .post('/signoEditar', signoController.updateSigno)
    .post('/signo', signoController.consultarSigno)

module.exports = router;