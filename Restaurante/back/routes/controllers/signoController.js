const fs = require('fs/promises');
const path = require('path');

const consultaSignos = async (req, res)=>{
    console.log(req.body)
    const {signo,textoGenero} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const setSigno = objSignos[textoGenero][signo];
    res.json(setSigno)
}

const consultaEditar = async (req, res)=>{
    console.log(req.body)
    const {signoEditar, textoGenero, textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [textoGenero]:{...objSignos[textoGenero],[signoEditar]:textoEditar}
    }

    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json("a")
}

const consultaUsuarios = async (req, res) => {
    const { username, password, rol } = req.body;

    try {
        // Leer el archivo JSON de usuarios
        const allUsuarios = await fs.readFile(path.join(__dirname, '../../db/usuarios.json'));
        const objUsuarios = JSON.parse(allUsuarios);

        // Buscar el usuario por su username y rol
        const usuario = Object.values(objUsuarios).find(user => user.username === username && user.password === password && user.rol === rol);

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al consultar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const consultaTodosUsuarios = async (req, res) => {
    try {
        // Leer el archivo JSON de usuarios
        const allUsers = await fs.readFile(path.join(__dirname, '../../db/usuarios.json'));
        const objUsers = JSON.parse(allUsers);
        
        // Enviar todos los usuarios como respuesta
        res.json(objUsers);
    } catch (error) {
        console.error('Error al consultar todos los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const registrarUsuarios = async (req, res) => {
    console.log(req.body);
    const { username, password, rol } = req.body;

    try {
        const filePath = path.join(__dirname, '../../db/usuarios.json');

        // Leer el archivo JSON para obtener los usuarios existentes
        const allUsers = await fs.readFile(filePath);
        const objUsers = JSON.parse(allUsers);

        // Verificar si el usuario ya existe
        if (objUsers[username]) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        objUsers[username] = { username, password, rol };

        // Escribir los datos actualizados en el archivo JSON
        await fs.writeFile(filePath, JSON.stringify(objUsers, null, 2), { encoding: 'utf-8' });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const registrarProductos = async (req, res) => {
    console.log(req.body);
    const { nombreproduc, precio } = req.body;

    try {
        const filePath = path.join(__dirname, '../../db/productos.json');

        // Leer el archivo JSON para obtener los usuarios existentes
        const allUsers = await fs.readFile(filePath);
        const objUsers = JSON.parse(allUsers);

        // Verificar si el usuario ya existe
        if (objUsers[nombreproduc]) {
            return res.status(400).json({ message: 'El producto ya existe' });
        }

        objUsers[nombreproduc] = { nombreproduc, precio };

        // Escribir los datos actualizados en el archivo JSON
        await fs.writeFile(filePath, JSON.stringify(objUsers, null, 2), { encoding: 'utf-8' });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const consultaProductos = async (req, res) => {
    try {
        // Leer el archivo JSON de usuarios
        const allProduc = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const objProduc = JSON.parse(allProduc);
        
        // Enviar todos los usuarios como respuesta
        res.json(objProduc);
    } catch (error) {
        console.error('Error al consultar todos los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const registrarPedidos = async (req, res) => {
    const { id, mesero, estado, productos } = req.body;

    try {
        const filePath = path.join(__dirname, '../../db/pedidos.json');

        // Leer el archivo JSON para obtener los pedidos existentes
        const allPedidos = await fs.readFile(filePath);
        const objPedidos = JSON.parse(allPedidos);

        // Verificar si el pedido ya existe
        const pedidoExistente = objPedidos.find(pedido => pedido.id === id);
        if (pedidoExistente) {
            return res.status(400).json({ message: 'El pedido ya existe' });
        }

        objPedidos.push({ id, mesero, estado, productos });

        // Escribir los datos actualizados en el archivo JSON
        await fs.writeFile(filePath, JSON.stringify({ pedidos: objPedidos }, null, 2), { encoding: 'utf-8' });

        res.status(201).json({ message: 'Pedido registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const consultaPedidos = async (req, res) => {
    try {
        // Leer el archivo JSON de pedidos
        const allPedidos = await fs.readFile(path.join(__dirname, '../../db/pedidos.json'));
        const objPedidos = JSON.parse(allPedidos);
        
        // Enviar todos los pedidos como respuesta
        res.json(objPedidos);
    } catch (error) {
        console.error('Error al consultar todos los pedidos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    consultaSignos,
    consultaEditar,
    registrarUsuarios,
    consultaUsuarios,
    consultaTodosUsuarios,
    registrarProductos,
    consultaProductos,
    registrarPedidos,
    consultaPedidos
}