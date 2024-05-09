const express = require('express');
const router = express.Router();
const countriesController = require('./controllers/countriesController.js');


router
  .get('/pais',countriesController.obtener)

  .post('/tiquetes',countriesController.guardar)

module.exports = router;
