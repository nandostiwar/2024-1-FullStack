const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
router
    .post('/dos', signoController.consultaSignos)
    .post('/tres', signoController.consultaEditar)

module.exports = router;