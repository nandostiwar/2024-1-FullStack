const fs = require('fs/promises');
const path = require('path');

const login = async (req, res)=>{
    const {username, password} = req.body;

    const allUsers = await fs.readFile(path.join(__dirname, '../../db/users.json'));
    const objUsers = JSON.parse(allUsers);

    const userFound = objUsers.find(user => user.user === username);
    if (userFound) {
        if (userFound.password === password) {
            res.json(userFound);
        } else {
            res.json({ error: "Contraseña incorrecta" });
        }
    } else {
        res.json({ error: "Usuario no encontrado" });
    }
}

const getAllUsers = async (req, res)=>{
    const user = await fs.readFile(path.join(__dirname,'../../db/users.json'));
    const usersJson = JSON.parse(user)
    res.json(usersJson);
}

const getUser = async (req, res)=>{
    const userParam = req.params.userId;
    const allUsers = await fs.readFile(path.join(__dirname, '../../db/users.json'));
    const objUsers = JSON.parse(allUsers);
    const userFound = objUsers.find(user => user.id === userParam);
    if (userFound) {
        res.json(userFound);
    } else {
        res.json({ error: "Usuario no encontrado" });
    }
}

const createUser = async (req, res)=>{
    try {
        const allUsers = await fs.readFile(path.join(__dirname,'../../db/users.json'));
        const objUsers = JSON.parse(allUsers);

        const userExists = objUsers.find(user => user.user === req.body.user);
        if (userExists) {
            return res.status(400).json({ error: "Ya existe un usuario con ese nombre" });
        }

        objUsers.push(req.body);

        await fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(objUsers));

        res.json(req.body);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
}

const deleteUser = async (req, res)=>{
    console.log(deleteUser);
    try {
        const userDelete = req.params.user;
        const allUsers = await fs.readFile(path.join(__dirname, '../../db/users.json'));
        let objUsers = JSON.parse(allUsers);

        const indexToDelete = objUsers.findIndex(user => user.user === userDelete);

        objUsers.splice(indexToDelete, 1);

        await fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(objUsers));

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
}

const updateUser = async (req, res) => {
    try {
        const username = req.body.user;
        const updatedUserData = req.body;

        const allUsers = await fs.readFile(path.join(__dirname, '../../db/users.json'));
        let objUsers = JSON.parse(allUsers);

        const userToUpdateIndex = objUsers.findIndex(user => user.user === username);

        objUsers[userToUpdateIndex] = { ...objUsers[userToUpdateIndex], ...updatedUserData };

        await fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(objUsers));

        res.json(req.body);
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