const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const path = require('path');

async function getContry(req, res) {
    const { text } = req.query;

    try {
        const results = await pool.db('tiquetes').collection('Countries').find({ name: { $regex: text, $options: 'i' } }).toArray();
        res.send(results);
    } catch (error) {
        console.log("error en la busqueda", error);
    }
}

async function getAllcountries(req, res) {
    const product = await pool.db('tiquetes').collection('Countries').find().toArray();

    res.send(product);
}

async function uploadCountries(req,res){
    const contenido = await fs.readFile(path.join(__dirname, '../../db/countries.json'));
    const data = JSON.parse(contenido);

    try {
        const resultado = await pool.db('tiquetes').collection('Countries').insertMany(data.countries);
        res.send(`${resultado.insertedCount} documentos insertados correctamente.`);
    } catch (error) {
        res.send(JSON.stringify({"Error server message": "Ha ocurrido algo"}));
    }
}


module.exports = {
    getContry,
    getAllcountries,
    uploadCountries
}