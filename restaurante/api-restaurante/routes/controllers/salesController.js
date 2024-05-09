const fs = require('fs/promises');
const path = require('path');

const getAllSales = async (req, res)=>{
    const sale = await fs.readFile(path.join(__dirname,'../../db/sales.json'));
    const salesJson = JSON.parse(sale)
    res.json(salesJson);
}

const createSales = async (req, res)=>{
    try {
        const allSales = await fs.readFile(path.join(__dirname,'../../db/sales.json'));
        const objSales = JSON.parse(allSales);

        objSales.push(req.body);

        await fs.writeFile(path.join(__dirname, '../../db/sales.json'), JSON.stringify(objSales));

        res.json(req.body);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).json({ error: "Error al crear orden" });
    }
}

const updateSale = async (req, res) => {
    try {
        const id = req.body.id;
        const updatedSaleData = req.body;

        const allSales = await fs.readFile(path.join(__dirname, '../../db/sales.json'));
        let objSales = JSON.parse(allSales);

        const saleToUpdateIndex = objSales.findIndex(sale => sale.id === id);

        objSales[saleToUpdateIndex] = { ...objSales[saleToUpdateIndex], ...updatedSaleData };

        await fs.writeFile(path.join(__dirname, '../../db/sales.json'), JSON.stringify(objSales));

        res.json(req.body);
    } catch (error) {
        console.error("Error al actualizar orden:", error);
        res.status(500).json({ error: "Error al actualizar orden" });
    }
}

module.exports = {
    getAllSales,
    createSales,
    updateSale
}