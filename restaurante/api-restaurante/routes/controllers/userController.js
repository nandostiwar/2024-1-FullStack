const fs = require('fs/promises');
const pool = require ("../database/dbmongo")
const path = require('path');

const login = async (req, res)=>{
    const {username, password} = req.body;

    try {
        const user = await pool.db('restaurante').collection('users').findOne({ user: username });

        if (user) {
            if (user.password === password) {
                res.json(user);
            } else {
                res.json({ error: "Contraseña incorrecta" });
            }
        } else {
            res.json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
}

const getAllUsers = async (req, res)=>{
    try {
        const users = await pool.db('restaurante').collection('users').find().toArray();
        res.json(users);
    } catch (error) {
        console.error("Error al obtener todos los usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
}

const getUser = async (req, res)=>{
    const userId = req.params.userId;

    try {
        const user = await pool.db('restaurante').collection('users').findOne({ _id: new ObjectId(userId) });

        if (user) {
            res.json(user);
        } else {
            res.json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: "Error al obtener usuario" });
    }
}

const createUser = async (req, res)=>{
    const newUser = req.body;

    try {
        const userExists = await pool.db('restaurante').collection('users').findOne({ user: newUser.user });

        if (userExists) {
            return res.status(400).json({ error: "Ya existe un usuario con ese nombre" });
        }

        await pool.db('restaurante').collection('users').insertOne(newUser);
        res.json(newUser);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
}

const deleteUser = async (req, res)=>{
    const username = req.body.user;

    if (!username) {
        return res.status(400).json({ error: "El nombre de usuario es requerido" });
    }

    try {
        const result = await pool.db('restaurante').collection('users').deleteOne({ user: username });

        if (result.deletedCount > 0) {
            res.json({ message: "Usuario eliminado correctamente" });
        } else {
            res.json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
}

const updateUser = async (req, res) => {
    const username = req.body.user;
    const updatedUserData = req.body;

    try {
        const result = await pool.db('restaurante').collection('users').updateOne(
            { user: username },
            { $set: updatedUserData }
        );

        if (result.matchedCount > 0) {
            res.json(updatedUserData);
        } else {
            res.json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error al actualizar usuario" });
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