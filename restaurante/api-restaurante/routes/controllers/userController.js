const fs = require('fs/promises');
const path = require('path');

const login = async (req, res)=>{
    const {username, password} = req.body;
    // const username = req.params.username;
    // const password = req.params.password;

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

module.exports = {
    login,
    getAllUsers,
    getUser
}