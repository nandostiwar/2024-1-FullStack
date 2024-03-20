const fs = require('fs/promises');
const path = require('path');


const loginUser =  async (req, res) => {
    const usersFilePath = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));

    const login = req.body;
    try {
        const data = JSON.parse(usersFilePath);
        const user = data.Usuarios.find(u => u.Usuario === login.Usuario && u.Password === login.Password);

        if (user) {
            res.json(user);
        } else {
            res.status(404);
            res.json({"mensaje":"Usuario o clave incorrectos"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el usuario');
    }
    
}


// Obtener un usuario por ID
const getUser = async (req, res) => {
    const usersFilePath = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    
    try {
        const data = JSON.parse(usersFilePath);
        const user = data.Usuarios.find(u => u.id === parseInt(req.params.id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el usuario');
    }
}

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const newUser = req.body; // Asegúrate de validar y sanear los datos de entrada en un caso real
        const usersData = await fs.readFile(usersFilePath, 'utf8');
        const users = JSON.parse(usersData);
        newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1; // Asignar un nuevo ID
        users.push(newUser);
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}

// Actualizar un usuario existente
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const usersData = await fs.readFile(usersFilePath, 'utf8');
        const users = JSON.parse(usersData);
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
        users[userIndex] = { ...users[userIndex], ...updates };
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
        res.json(users[userIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usersData = await fs.readFile(usersFilePath, 'utf8');
        const users = JSON.parse(usersData);
        const newUsers = users.filter(u => u.id !== parseInt(id));
        if (users.length === newUsers.length) return res.status(404).json({ message: 'Usuario no encontrado' });
        await fs.writeFile(usersFilePath, JSON.stringify(newUsers, null, 2));
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}

module.exports = {
    loginUser,
    getUser,
    createUser,
    updateUser,
    deleteUser
}