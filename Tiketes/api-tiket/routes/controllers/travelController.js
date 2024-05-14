const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const path = require('path');


async function getAllTraveles(req, res) {

    const traveles = await pool.db('tikets_data').collection('traveles').find().toArray();

    res.send(traveles);
}

const createTraveles = async (req, res) => {
    try {
        const newTravel = req.body;


        const travelExists = await pool.db('tikets_data').collection('traveles').findOne({
            $or: [
                { origen: newTravel.origen },
                { destino: newTravel.destino },
                { data: newTravel.data }
            ]
        });

        if (travelExists) {
            return res.status(400).json({ error: "Ya existe un viaje con alguna de esa información" });
        }

        // Insertar el nuevo viaje en la base de datos
        await pool.db('tikets_data').collection('traveles').insertOne(newTravel);

        res.json(newTravel);
    } catch (error) {
        console.error("Error al crear el viaje:", error);
        res.status(500).json({ error: "Error al crear el viaje" });
    }
}



const updateTraveles = async (req, res) => {
    try {
        const id = req.body.id;
        const updatedTravelData = req.body;

        const AllTraveles = await fs.readFile(path.join(__dirname, '../../db/traveles.json'));
        let objTraveles = JSON.parse(AllTraveles);

        const saleToUpdateIndex = objTraveles.findIndex(travel => travel.id === id);

        objTraveles[saleToUpdateIndex] = { ...objSales[saleToUpdateIndex], ...updatedTravelData };

        await fs.writeFile(path.join(__dirname, '../../db/traveles.json'), JSON.stringify(objTraveles));

        res.json(req.body);
    } catch (error) {
        console.error("Error al actualizar orden:", error);
        res.status(500).json({ error: "Error al actualizar orden" });
    }
}

module.exports = {
    getAllTraveles,
    createTraveles,
    updateTraveles
}