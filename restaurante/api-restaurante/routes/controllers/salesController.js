const fs = require('fs/promises');
const path = require('path');
const pool = require ("../Database/mongoDB");

// buscar ventas
const  getAllSales = async (req, res) => {
    try {
        const salesCollection = pool.db('Restaurantejf').collection('sales');
        // Obtener todas las ventas
        const sales = await salesCollection.find().toArray();
        res.json(sales);
    } catch (error) {
        console.error("Error al obtener las ventas:", error);
        res.status(500).json({ error: "Error al obtener las ventas" });
    }
}
// crear ventas
const createSales = async (req, res) => {
    try {
        const salesCollection = pool.db('Restaurantejf').collection('sales');
        await salesCollection.insertOne(req.body);
        res.json(req.body);
    } catch (error) {
        console.error("Error al crear la venta:", error);
        res.status(500).json({ error: "Error al crear la venta" });
    }
}
//actualizar venta
const updateSale = async (req, res) => {
    try {
        const saleData = req.body; // Obtener los datos del cuerpo de la solicitud
        const saleId = saleData.id; // Asegúrate de que saleId se obtiene correctamente
        if (!saleId) {
            return res.status(400).json({ error: "ID de venta no proporcionado" });
        }

        const saleCollection = pool.db('Restaurantejf').collection('sales');

        const result = await saleCollection.updateOne(
            { sale: saleId }, 
            { $set: saleData }
        );

        if (result.modifiedCount === 1) {
            const updatedSale = await saleCollection.findOne({ sale: saleId });
            return res.json(updatedSale); // Devolver dato actualizado
        } else {
            return res.status(404).json({ error: "Venta no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar la venta:", error);
        res.status(500).json({ error: "Error al actualizar la venta" });
    }
};

module.exports = {
    getAllSales,
    createSales,
    updateSale
}