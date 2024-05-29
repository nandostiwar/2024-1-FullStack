const fs = require('fs/promises');
const path = require('path');
const pool = require ("../Database/mongoDB");

const getRestaurant = async (req, res)=>{
    res.json({name: "restaurante prueba"})
}

module.exports = {
    getRestaurant
}