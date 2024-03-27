const fs = require('fs/promises');
const path = require('path');
const { response } = require("../helpers/dataResponse");
const dbSales = fs.readFile(path.join(__dirname,'../../db/sales.json'));

const addSales = async (req, res) => {
    console.log(req.body);

    try {
        const sales = await dbSales;
        const salesJson = await JSON.parse(sales);

        salesJson.sales.push(req.body)
        console.log('salesJson');
        console.log(salesJson);
        await fs.writeFile(path.join(__dirname,'../../db/sales.json'), JSON.stringify(salesJson, null, 2), {encoding: 'utf-8'})

        response(res, {payload: salesJson, msg: "."});

    } catch (error) {
        
    }
}

const getSales = async (req, res) => {
    const sales = await dbSales;
    const salesJson = await JSON.parse(sales);

    console.log('salesJson');
    console.log(salesJson);
    console.log(salesJson['pedido']);

    response(res, {payload: salesJson, msg: "."});
}

module.exports = {
    addSales,
    getSales
}