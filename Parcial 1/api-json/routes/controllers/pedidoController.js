const fs = require('fs/promises');
const path = require('path');

const listarPedidos = async (req, res)=>{
    const restaurante = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    const restauranteJson = JSON.parse(restaurante)
    res.json(restauranteJson.Pedidos);
}

const agregarPedido = async (req, res) => {

    console.log("esto es lo que recibo:", req.body)
    try {
        // Leer el archivo existente
        const dataPath = path.join(__dirname, '../../db/restaurante.json');
        const data = await fs.readFile(dataPath, 'utf8');
        const restauranteJson = JSON.parse(data);

        // Crear un nuevo pedido basado en el cuerpo de la solicitud
        // Asumiendo que el cuerpo de la solicitud ya contiene toda la información del pedido necesaria
        const nuevoPedido = req.body;

        // Opcional: asignar un nuevo ID al pedido. 
        // Esto asume que idPedido es numérico y que deseas autoincrementarlo.
        const ultimoId = restauranteJson.Pedidos.reduce((acc, pedido) => {
            return acc > pedido.idPedido ? acc : pedido.idPedido;
        }, 0);
        nuevoPedido.idPedido = ultimoId + 1;

        // Agregar el nuevo pedido al array de Pedidos
        restauranteJson.Pedidos.push(nuevoPedido);

        // Escribir el archivo JSON actualizado
        await fs.writeFile(dataPath, JSON.stringify(restauranteJson, null, 2), 'utf8');

        // Enviar una respuesta
        res.status(201).json(nuevoPedido);
    } catch (error) {
        console.error('Error al agregar el pedido:', error);
        res.status(500).json({ message: 'Error al agregar el pedido' });
    }
};

const cambiarEstadoPedido = async (req, res) => {
    const { id } = req.params; 
    const { estado } = req.body; 

    

    try {
        const filePath = path.join(__dirname, '../../db/restaurante.json');
        const data = await fs.readFile(filePath, 'utf8');
        const restaurante = JSON.parse(data);

        const pedidoIndex = restaurante.Pedidos.findIndex(p => p.idPedido == id);

        if (pedidoIndex === -1) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        restaurante.Pedidos[pedidoIndex].estado = estado; 

        await fs.writeFile(filePath, JSON.stringify(restaurante, null, 2), 'utf8');

        res.json({ message: "Estado del pedido actualizado", pedido: restaurante.Pedidos[pedidoIndex] });
    } catch (error) {
        console.error('Error al cambiar el estado del pedido:', error);
        res.status(500).json({ message: 'Error al procesar su solicitud' });
    }
};



module.exports ={
    listarPedidos,
    agregarPedido,
    cambiarEstadoPedido
}