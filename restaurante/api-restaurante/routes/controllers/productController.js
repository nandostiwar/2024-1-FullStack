const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const path = require('path');

const getAllProducts = async (req, res)=>{
    try {
        const products = await pool.db('restaurante').collection('products').find().toArray();
        res.json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
}

const createProduct = async (req, res)=>{
    try {
        const newProduct = req.body;

        const productExists = await pool.db('restaurante').collection('products').findOne({ name: newProduct.name });
        if (productExists) {
            return res.status(400).json({ error: "Ya existe un producto con ese nombre" });
        }

        await pool.db('restaurante').collection('products').insertOne(newProduct);
        res.json(newProduct);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" });
    }
}

const deleteProduct = async (req, res)=>{
    try {
        const productName = req.body.name;

        const result = await pool.db('restaurante').collection('products').deleteOne({ name: productName });

        if (result.deletedCount > 0) {
            res.json({ message: "Producto eliminado correctamente" });
        } else {
            res.json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productName = req.body.name;
        const updatedProductData = req.body;

        const result = await pool.db('restaurante').collection('products').updateOne(
            { name: productName },
            { $set: updatedProductData }
        );

        if (result.matchedCount > 0) {
            res.json(req.body);
        } else {
            res.json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
}