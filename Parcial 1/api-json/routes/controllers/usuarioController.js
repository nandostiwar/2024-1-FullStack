const fs = require('fs/promises');
const path = require('path');

const getUser = async (req, res)=>{
    const restaurante = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    const restauranteJson = JSON.parse(restaurante)
    res.json(restauranteJson.Usuarios);
}

module.exports ={
    getUser
}