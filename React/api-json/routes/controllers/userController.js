const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const fs = require('fs').promises;


const postuser = async (id, correo, contraseña, rol, activate) => {
    try {
        const usuariosregistrados = require('./../../db/users.json');
        const nuevoUsuario = {
            id: id,
            user: correo,
            password: contraseña,
            role: rol,
            activate: activate // Aquí se envía directamente el valor booleano
        };
        usuariosregistrados.push(nuevoUsuario);
        await fs.writeFile(path.join(__dirname, './../../db/users.json'), JSON.stringify(usuariosregistrados, null, 2));
        return nuevoUsuario;
    } catch (error) {
        throw error;
    }
};

const registrarUsuarios = async (req, res) => {
    console.log(req.body);
    const { username, password, rol, activate } = req.body;

    try {
        const filePath = path.join(__dirname, './../../db/users.json');

        // Leer el archivo JSON para obtener los usuarios existentes
        const allUsers = await fs.readFile(filePath);
        const objUsers = JSON.parse(allUsers);

        // Verificar si el usuario ya existe
        if (objUsers[username]) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        objUsers[username] = { username, password, rol, activate }; // Incluir la propiedad activate

        // Escribir los datos actualizados en el archivo JSON
        await fs.writeFile(filePath, JSON.stringify(objUsers, null, 2), { encoding: 'utf-8' });

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



const getAlluser = async (req, res) => {
    try {
        const userFilePath = path.join(__dirname, '../../db/users.json');
        const usersData = await fs.readFile(userFilePath, 'utf-8');
        const usersJson = JSON.parse(usersData);

        res.json(usersJson);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getOneuser = async (req, res) => {
    const oneuser = req.params.user;
    try {
        const response = await axios.get(`http://localhost:4000/v1/sitio/${oneuser}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateuser = async (req, res) => {
    const userEditar = req.params.userEditar;
    const { textoEditar } = req.body;
    try {
        const response = await axios.put(`http://localhost:4000/v1/sitio/${userEditar}`, { textoEditar });
        res.json({
            message: "Updated"
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    postuser,
    registrarUsuarios,
    getAlluser,
    getOneuser,
    updateuser
};






/*

const fs = require('fs/promises');
const path = require('path');


const postuser = async (id, correo, contraseña, rol, activate) => {
    try {
        const usuariosregistrados = require('./../../db/users.json'); 
        const nuevoUsuario = {
            id: id, 
            user: correo,
            password: contraseña,
            role: rol,
            activate: activate
        };
        usuariosregistrados.push(nuevoUsuario);
        await fs.promises.writeFile(path.join(__dirname, './../../db/users.json'), JSON.stringify(usuariosregistrados, null, 2));
        return nuevoUsuario;
    } catch (error) {
        throw error;
    }
};

const registrarUsuarios = async (req, res) => {
    console.log(req.body);
    const { username, password, rol } = req.body;

    try {
        const filePath = path.join(__dirname, './../../db/users.json');

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
};

const getAlluser = async (req, res)=>{
    const user = await fs.readFile(path.join(__dirname,'./../../db/users.json'));
    const usersJson = JSON.parse(user)
    res.json(usersJson);
}

const getOneuser = async (req, res)=>{
    const oneuser = req.params.user;
    const allusers = await fs.readFile(path.join(__dirname,'../db/users.json'));
    const objusers = JSON.parse(allusers);
    const result = objusers[oneuser];
    res.json(result)
}

const updateuser = async (req, res)=>{
    const userEditar = req.params.userEditar;
    const {textoEditar} = req.body;
    const allusers = await fs.readFile(path.join(__dirname,'../db/users.json'));
    const objusers = JSON.parse(allusers);

    const objUpdate = {
        ...objusers,
        [userEditar]: textoEditar
    }
    await fs.writeFile(path.join(__dirname,'../db/users.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

module.exports = {
    postuser,
    registrarUsuarios,
    getAlluser,
    getOneuser,
    updateuser
};
*/