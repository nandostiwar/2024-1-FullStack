const router = require('express').Router();
const express = require('express');
const connectToDB = require( '../config/db');


router.use('/api', require('./api'));




connectToDB();
module.exports = router;