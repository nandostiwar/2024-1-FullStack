const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const path = require('path');

async function getAllViajes(req, res) {
    const viaje = await pool.db('tiketesExpres').collection('Viajes').find().toArray();

    res.send(viaje);
}

async function createViajes(req, res) {
    try {
        const { origen, destino, dia } = req.body;
        const existingTravel = await pool.db('tiketesExpres').collection('Viajes').findOne({ origen, destino, dia });

        if (existingTravel) {
            return res.status(400).send({ error: 'Ya existe un viaje con el mismo origen, destino y fecha' });
        }
        const results = await pool.db('tiketesExpres').collection('Viajes').insertOne(req.body);
        res.send(req.body);
    } catch (error) {
        console.log("error al crear su viaje", error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getAllViajes,
    createViajes
}