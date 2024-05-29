const fs = require('fs/promises');
const path = require('path');
const pool = require ("../Database/mongoDB");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userCollection = pool.db('Restaurantejf').collection('users');

        // Buscar el usuario por nombre de usuario
        const userFound = await userCollection.findOne({ user: username });
        if (userFound) {
            // Verificar la contraseña
            if (userFound.password === password) {
                res.json(userFound);
            } else {
                res.status(401).json({ error: "Contraseña incorrecta" });
            }
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error en inicio de sesión:", error);
        res.status(500).json({ error: "Error en inicio de sesión" });
    }
}

// buscar usuarios
const getAllUsers = async (req, res) => {
    try {
        const userCollection = pool.db('Restaurantejf').collection('users');
        // Obtener todos los usuarios
        const users = await userCollection.find().toArray();
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
}

// buscar usuario especifico
const getUser = async (req, res) => {
    try {
        const userId = req.query.user; // Obtener el ID del parámetro de consulta
        const userCollection = pool.db('Restaurantejf').collection('users');

        // Buscar el usuario por el ID proporcionado
        const user = await userCollection.findOne({ user: userId });

        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        if (error.code === 'ECONNRESET') {
            return res.status(500).json({ error: "Error de conexión con la base de datos" });
        }
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
// crear usuario
const createUser = async (req, res) => {
    try {
        const userCollection = pool.db('Restaurantejf').collection('users');
        // Verificar si el usuario ya existe
        const existingUser = await userCollection.findOne({ user: req.body.user });
        if (existingUser) {
           return res.status(400).json({ error: "Ya existe un usuario con ese nombre" });
        }
        // Insert the new user
        await userCollection.insertOne(req.body);
        res.json(req.body);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
}
// eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const userId = req.query.user; // Obtener el ID del parámetro de consulta
        const userCollection = pool.db('Restaurantejf').collection('users');

        // Eliminar el usuario por el ID proporcionado
        const result = await userCollection.deleteOne({ user: userId });

        if (result.deletedCount === 1) {
            return res.json({ message: "Usuario eliminado exitosamente" });
        } else {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        if (error.code === 'ECONNRESET') {
            return res.status(500).json({ error: "Error de conexión con la base de datos" });
        }
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

//actualizar usuario
const updateUser = async (req, res) => {
    try {
        const userData = req.body; // Obtener los datos del usuario del cuerpo de la solicitud
        const userId = userData.user; // Obtener el nombre de usuario para buscar
        const userCollection = pool.db('Restaurantejf').collection('users');
        // Actualizar el usuario por el nombre de usuario proporcionado
        const result = await userCollection.updateOne({ user: userId }, { $set: userData });

        if (result.modifiedCount === 1) {
            const updatedUser = await userCollection.findOne({ user: userId });
            return res.json(updatedUser); // Devolver el usuario actualizado
        } else {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        if (error.code === 'ECONNRESET') {
            return res.status(500).json({ error: "Error de conexión con la base de datos" });
        }
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}



module.exports = {
    login,
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}