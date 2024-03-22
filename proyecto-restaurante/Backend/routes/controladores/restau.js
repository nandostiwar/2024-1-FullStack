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

module.exports = {
    consultarUsuario
};


