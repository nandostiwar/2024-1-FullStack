const fs = require('fs/promises');
const path = require('path');

const getAllproducto = async (req, res)=>{
    const producto = await fs.readFile(path.join(__dirname,'../../db/productos.json'));
    const productosJson = JSON.parse(producto)
    res.json(productosJson);
}

const getOneproducto = async (req, res)=>{
    const oneproducto = req.params.producto;
    const allproductos = await fs.readFile(path.join(__dirname,'../../db/productos.json'));
    const objproductos = JSON.parse(allproductos);
    const result = objproductos[oneproducto];
    res.json(result)
}

const updateproducto = async (req, res)=>{
    const productoEditar = req.params.productoEditar;
    const {textoEditar} = req.body;
    const allproductos = await fs.readFile(path.join(__dirname,'../../db/productos.json'));
    const objproductos = JSON.parse(allproductos);

    const objUpdate = {
        ...objproductos,
        [productoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/productos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

module.exports = {
    getAllproducto,
    getOneproducto,
    updateproducto
}