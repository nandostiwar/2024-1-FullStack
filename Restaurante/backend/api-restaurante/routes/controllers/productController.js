const fs = require('fs/promises');
const path = require('path');

const getAllProducts = async (req, res)=>{
    const product = await fs.readFile(path.join(__dirname,'../../db/products.json'));
    const productsJson = JSON.parse(product)
    res.json(productsJson);
}

const createProduct = async (req, res)=>{
    try {
        const allProducts = await fs.readFile(path.join(__dirname,'../../db/products.json'));
        const objProducts = JSON.parse(allProducts);

        const productExists = objProducts.find(product => product.name === req.body.name);
        if (productExists) {
            return res.status(400).json({ error: "Ya existe un producto con ese nombre" });
        }

        objProducts.push(req.body);

        await fs.writeFile(path.join(__dirname, '../../db/products.json'), JSON.stringify(objProducts));

        res.json(req.body);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" });
    }
}

const deleteProduct = async (req, res)=>{
    try {
        const productDelete = req.params.name;
        const allProducts = await fs.readFile(path.join(__dirname, '../../db/products.json'));
        let objProducts = JSON.parse(allProducts);

        const indexToDelete = objProducts.findIndex(product => product.name === productDelete);

        objProducts.splice(indexToDelete, 1);

        await fs.writeFile(path.join(__dirname, '../../db/products.json'), JSON.stringify(objProducts));

        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const name = req.body.name;
        const updatedProductData = req.body;

        const allProducts = await fs.readFile(path.join(__dirname, '../../db/products.json'));
        let objProducts = JSON.parse(allProducts);

        const userToUpdateIndex = objProducts.findIndex(product => product.name === name);

        objProducts[userToUpdateIndex] = { ...objProducts[userToUpdateIndex], ...updatedProductData };

        await fs.writeFile(path.join(__dirname, '../../db/products.json'), JSON.stringify(objProducts));

        res.json(req.body);
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