const fs = require('fs/promises');
const path = require('path');

const getTiket = async (req, res)=>{
    res.json({name: "tiket prueba"})
}

module.exports = {
    getTiket
}