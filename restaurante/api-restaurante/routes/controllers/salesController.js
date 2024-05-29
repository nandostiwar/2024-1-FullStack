const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const { ObjectId } = require('mongodb');
const path = require('path');

const getAllSales = async (req, res)=>{
    try {
        const sales = await pool.db('restaurante').collection('sales').find().toArray();
        res.json(sales);
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        res.status(500).json({ error: "Error al obtener ventas" });
    }
}

const createSales = async (req, res)=>{
    try {
        const newSale = req.body;

        await pool.db('restaurante').collection('sales').insertOne(newSale);
        res.json(newSale);
    } catch (error) {
        console.error("Error al crear la venta:", error);
        res.status(500).json({ error: "Error al crear venta" });
    }
}

const updateSale = async (req, res) => {
    try {
        const identificator = req.body.identificator;

        const updatedSaleData = {
            "identificator": req.body.identificator,
            "mesero": req.body.mesero,
            "mesa": req.body.mesa,
            "estado": req.body.estado,
            "productos": req.body.productos,
            "totalventa": req.body.totalventa
        }

        // Actualizar la venta
        const result = await pool.db('restaurante').collection('sales').updateOne(
            { identificator: identificator },
            { $set: updatedSaleData }
        );

        if (result.matchedCount > 0) {
            res.json(req.body);
        } else {
            res.json({ error: "Venta no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar venta:", error);
        res.status(500).json({ error: "Error al actualizar venta" });
    }
}

module.exports = {
    getAllSales,
    createSales,
    updateSale
}