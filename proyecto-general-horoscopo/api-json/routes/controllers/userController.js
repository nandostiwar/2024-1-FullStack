const fs = require('fs/promises');
const path = require('path');

const getAlluser = async (req, res)=>{
    const user = await fs.readFile(path.join(__dirname,'../../db/users.json'));
    const usersJson = JSON.parse(user)
    res.json(usersJson);
}

const getOneuser = async (req, res)=>{
    const oneuser = req.params.user;
    const allusers = await fs.readFile(path.join(__dirname,'../../db/users.json'));
    const objusers = JSON.parse(allusers);
    const result = objusers[oneuser];
    res.json(result)
}

const updateuser = async (req, res)=>{
    const userEditar = req.params.userEditar;
    const {textoEditar} = req.body;
    const allusers = await fs.readFile(path.join(__dirname,'../../db/users.json'));
    const objusers = JSON.parse(allusers);

    const objUpdate = {
        ...objusers,
        [userEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/users.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

module.exports = {
    getAlluser,
    getOneuser,
    updateuser
}