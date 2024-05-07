const express = require('express');
const router = express.Router();
const paisesController = require('../controller/paisesController');


router
    .get('/getpaises', paisesController.getPaisesSelect)
    

module.exports = router;