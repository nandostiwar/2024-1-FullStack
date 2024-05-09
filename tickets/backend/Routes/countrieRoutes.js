const express = require('express');
const countrieController = require('../Controllers/countrieController');

const router = express.Router();

router.get('/countries', countrieController.getCountrie);

module.exports = router;