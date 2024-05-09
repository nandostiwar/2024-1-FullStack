const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const path = require('path');


async function getAllcountries(req, res) {
    const product = await pool.db('tiketesExpres').collection('Countries').find().toArray();

    res.send(product);
}

async function uploadCountries(req,res){
    const contenido = await fs.readFile(path.join(__dirname, '../../db/countries.json'));
    const data = JSON.parse(contenido);

    try {
        const resultado = await pool.db('tiketesExpres').collection('Countries').insertMany(data.countries);
        res.send(`${resultado.insertedCount} documentos insertados correctamente.`);
    } catch (error) {
        res.send(JSON.stringify({"Error server message": "Ha ocurrido algo"}));
    }
}


module.exports = {
    getAllcountries,
    uploadCountries
}