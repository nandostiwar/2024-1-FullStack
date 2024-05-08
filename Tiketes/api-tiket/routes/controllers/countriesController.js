const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const path = require('path');


async function getAllcountries(req, res) {

    const product = await pool.db('tikets_data').collection('countries').find().toArray();

    res.send(product);
}

const createcounties = async (req, res)=>{
    try {
        const allProducts = await fs.readFile(path.join(__dirname,'../../db/countries.json'));
        const objProducts = JSON.parse(allProducts);

        const productExists = objProducts.find(product => product.name === req.body.name);
        if (productExists) {
            return res.status(400).json({ error: "Ya existe un pais con ese nombre" });
        }

        objProducts.push(req.body);

        await fs.writeFile(path.join(__dirname, '../../db/countries.json'), JSON.stringify(objProducts));

        res.json(req.body);
    } catch (error) {
        console.error("Error al crear pais:", error);
        res.status(500).json({ error: "Error al crear pais" });
    }
}

const deletecountires = async (req, res)=>{
    try {
        const productDelete = req.params.name;
        const allProducts = await fs.readFile(path.join(__dirname, '../../db/countries.json')); 
        let objProducts = JSON.parse(allProducts);

        const indexToDelete = objProducts.findIndex(product => product.name === productDelete);

        objProducts.splice(indexToDelete, 1);

        await fs.writeFile(path.join(__dirname, '../../db/countries.json'), JSON.stringify(objProducts));

        res.json({ message: "Pais eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar pais:", error);
        res.status(500).json({ error: "Error al eliminar pais" });
    }
}

const updatecounties = async (req, res) => {
    try {
        const name = req.body.name;
        const updatedProductData = req.body;

        const allProducts = await fs.readFile(path.join(__dirname, '../../db/countries.json'));
        let objProducts = JSON.parse(allProducts);

        const userToUpdateIndex = objProducts.findIndex(product => product.name === name);

        objProducts[userToUpdateIndex] = { ...objProducts[userToUpdateIndex], ...updatedProductData };

        await fs.writeFile(path.join(__dirname, '../../db/countries.json'), JSON.stringify(objProducts));

        res.json(req.body);
    } catch (error) {
        console.error("Error al actualizar pais:", error);
        res.status(500).json({ error: "Error al actualizar pais" });
    }
}

module.exports = {
    getAllcountries,
    createcounties,
    deletecountires,
    updatecounties
}