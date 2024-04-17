const fs = require('fs/promises');
const path = require('path');

const validarUsuario = async (req, res) => {
    const usuario = await fs.readFile(path.join(__dirname,'../../db/usuarios.json'));
    const usuariosJson = JSON.parse(usuario)
}
// Esta es mi funcion para validar usuarios y necesito que el usuario que me llega desde el foront, se valide en el json de usuarios

const obtenerUsuarios = async (req, res) => {
    const usuario = await fs.readFile(path.join(__dirname,'../../db/usuarios.json'));
    const usuariosJson = JSON.parse(usuario)
}

module.exports = {
    obtenerUsuarios,
    validarUsuario
}