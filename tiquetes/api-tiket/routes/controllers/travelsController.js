const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const path = require('path');

async function getAllTravels(req, res) {
    const travels = await pool.db('tiquetes').collection('Travels').find().toArray();

    res.send(travels);
}

async function createTravels(req, res) {
    try {
        const { origen, destino, date } = req.body;
        const existingTravel = await pool.db('tiquetes').collection('Travels').findOne({ origen, destino, date });

        if (existingTravel) {
            return res.status(400).send({ error: 'Ya existe un viaje con el mismo origen, destino y fecha' });
        }

        const results = await pool.db('tiquetes').collection('Travels').insertOne(req.body);
        res.send(req.body);
    } catch (error) {
        console.log("error creando el viaje", error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}


module.exports = {
    getAllTravels,
    createTravels
}