const fs = require('fs/promises');
const path = require('path');

const getAllSales = async (req, res)=>{
    const sale = await fs.readFile(path.join(__dirname,'../../db/sales.json'));
    const salesJson = JSON.parse(sale)
    res.json(salesJson);
}

module.exports = {
    getAllSales
}