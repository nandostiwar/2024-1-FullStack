const fs = require('fs/promises');
const path = require('path');

const getAllpedido = async (req, res)=>{
    const pedido = await fs.readFile(path.join(__dirname,'../../db/pedidos.json'));
    const pedidosJson = JSON.parse(pedido)
    res.json(pedidosJson);
}

const getOnepedido = async (req, res)=>{
    const onepedido = req.params.pedido;
    const allpedidos = await fs.readFile(path.join(__dirname,'../../db/pedidos.json'));
    const objpedidos = JSON.parse(allpedidos);
    const result = objpedidos[onepedido];
    res.json(result)
}

const updatepedido = async (req, res)=>{
    const pedidoEditar = req.params.pedidoEditar;
    const {textoEditar} = req.body;
    const allpedidos = await fs.readFile(path.join(__dirname,'../../db/pedidos.json'));
    const objpedidos = JSON.parse(allpedidos);

    const objUpdate = {
        ...objpedidos,
        [pedidoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/pedidos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

module.exports = {
    getAllpedido,
    getOnepedido,
    updatepedido
}