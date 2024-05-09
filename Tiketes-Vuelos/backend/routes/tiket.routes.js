const express = require ('express');
const router = express.Router();
const countriesController = require('./controllers/countriesController.js');
const viajesController = require('./controllers/viajesController.js');

// Rutas relacionadas con los países
router.route('/countries')
  .get(countriesController.getAllcountries)
  .post(countriesController.uploadCountries)

  
// Rutas relacionadas con la tabla de Viajes
router.route('/viajes')
  .get(viajesController.getAllViajes)
  .post(viajesController.createViajes);

module.exports = router;
