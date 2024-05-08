const express = require('express');
const router = express.Router();
const tiketController = require('./controllers/tiketController.js');
const countriesController = require('./controllers/countriesController.js');
const travelcontroller = require('./controllers/travelController.js');

// Ruta raíz del API
router.get('/', tiketController.getTiket);

// Rutas relacionadas con los países
router.route('/countries')
  .get(countriesController.getAllcountries)
  .post(countriesController.createcounties)
  .delete(countriesController.deletecountires)
  .put(countriesController.updatecounties);

// Rutas relacionadas con los viajes
router.route('/travel')
  .get(travelcontroller.getAllTraveles)
  .post(travelcontroller.createTraveles)
  .put(travelcontroller.updateTraveles);

module.exports = router;
