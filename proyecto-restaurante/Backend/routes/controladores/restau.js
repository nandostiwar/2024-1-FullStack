const {
    Console
} = require('console');
const fs = require('fs/promises');
const path = require('path');


const consultarUsuario = async (req, res) => {
    console.log(req.body);

    try {
        const usuarios = await fs.readFile(path.join(__dirname, '../../db/users.json'));
        const usuariosJson = JSON.parse(usuarios)
        const { username, password } = req.body;
        const user = usuariosJson.users.find((usuario) => {return (usuario.username == username && usuario.password == password)});
        
        


        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        console.log(user);

        // Aquí puedes realizar acciones adicionales si las credenciales son válidas,
        // como generar un token de sesión, guardar información en una cookie, etc.

        // Por ejemplo, si quieres devolver los datos del usuario:
        res.json({status:200, payload: user });

    } catch (error) {
        console.error('Error al consultar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const obtenerProductos = async (req, res) => {
    try {
        const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productosJson = JSON.parse(productos);
        res.json(productosJson);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const agregarProducto = async (req, res) => {
    try {
        const { name, price } = req.body;
        const productos = await fs.readFile(path.join(__dirname, '../../db/productos.json'));
        const productosJson = JSON.parse(productos);
        const id = productosJson.productos.length+1;
        const nuevoProducto = { name, price, id };
        

        productosJson.productos.push(nuevoProducto);
        await fs.writeFile(path.join(__dirname, '../../db/productos.json'), JSON.stringify(productosJson, null, 2));
        res.status(201).send(productosJson);
        
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Agregar funciones para actualizar y eliminar productos según sea necesario

module.exports = {
    consultarUsuario,
    obtenerProductos,
    agregarProducto
    // Agregar funciones para actualizar y eliminar productos según sea necesario
};


