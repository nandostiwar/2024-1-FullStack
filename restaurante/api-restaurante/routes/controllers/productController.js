const fs = require('fs/promises');
const path = require('path');
const pool = require ("../Database/mongoDB");

// buscar productos
const getAllProducts = async (req, res) => {
    try {
        const productCollection = pool.db('Restaurantejf').collection('products');
        // Obtener todos los productos
        const products = await productCollection.find().toArray();
        res.json(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
}
// crear producto
const createProduct = async (req, res) => {
    try {
        const ProductCollection = pool.db('Restaurantejf').collection('products');
        // Insert the new product
        await ProductCollection.insertOne(req.body);
        res.json(req.body);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" });
    }
}
// eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const productId = req.body.product; // Obtener el ID del parámetro de consulta
        const productCollection = pool.db('Restaurantejf').collection('products');

        // Eliminar el producto por el ID proporcionado
        const result = await productCollection.deleteOne({ product: productId });

        if (result.deletedCount === 1) {
            return res.json({ message: "Producto eliminado exitosamente" });
        } else {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar Producto:", error);
        if (error.code === 'ECONNRESET') {
            return res.status(500).json({ error: "Error de conexión con la base de datos" });
        }
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
//actualizar producto
const updateProduct = async (req, res) => {
    try {
        const productData = req.body; // Obtener los datos del cuerpo de la solicitud
        const productId = productData.product; // Obtener el nombre para buscar
        const productCollection = pool.db('Restaurantejf').collection('products');
        const result = await productCollection.updateOne({product: productId}, { $set: productData });
        
        if (result.modifiedCount === 1) {
            const updatedProduct = await productCollection.findOne({ product: productId });
            return res.json(updatedProduct); // Devolver producto actualizado
        } else {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar Producto:", error);
        res.status(500).json({ error: "Error al actualizar Producto" });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
}