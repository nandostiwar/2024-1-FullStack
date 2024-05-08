const fs = require('fs/promises');
const path = require('path');
const usersFilePath = path.join(__dirname,'../../db/restaurante.json');

const loginUser =  async (req, res) => {
    const usersFilePath = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));

    const login = req.body;
    try {
        const data = JSON.parse(usersFilePath);
        const user = data.Usuarios.find(u => u.Usuario === login.username && u.Password === login.password);

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
const getUserid = async (req, res) => {
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

const getUsers = async (req, res) => {
    const usersFilePath = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    
    try {
        const data = JSON.parse(usersFilePath);
        const user = data.Usuarios
        if (user) {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el usuario');
    }
}


// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const newUser = req.body; // Asegúrate de validar y sanear los datos de entrada
        const data = await fs.readFile(usersFilePath, 'utf8');
        const db = JSON.parse(data);

        newUser.id = db.Usuarios.length > 0 ? Math.max(...db.Usuarios.map(u => u.id)) + 1 : 1;
        newUser.Estado = 'Activo'; // Asumiendo que todos los nuevos usuarios están activos por defecto
        db.Usuarios.push(newUser);

        await fs.writeFile(usersFilePath, JSON.stringify(db, null, 2));

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al procesar su solicitud' });
    }
};

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
    getUsers,
    loginUser,
    getUserid,
    createUser,
    updateUser,
    deleteUser
}