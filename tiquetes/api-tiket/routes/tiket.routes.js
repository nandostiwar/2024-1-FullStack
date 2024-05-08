const express = require('express');
const router = express.Router();
const countriesController = require('./controllers/countriesController.js');
const travelsController = require('./controllers/travelsController.js');

// Rutas relacionadas con los países
router.route('/countries')
  .get(countriesController.getAllcountries)
  .post(countriesController.uploadCountries);

router.route('/country/search').get(countriesController.getContry);

router.route('/travels')
  .get(travelsController.getAllTravels)
  .post(travelsController.createTravels);

module.exports = router;
