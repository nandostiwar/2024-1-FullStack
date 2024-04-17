const fs = require('fs/promises');
const path = require('path');

const getRestaurant = async (req, res)=>{
    res.json({name: "restaurante prueba"})
}

module.exports = {
    getRestaurant
}