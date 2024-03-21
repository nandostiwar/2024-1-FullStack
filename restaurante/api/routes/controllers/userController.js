const fs = require('fs/promises');
const path = require('path');
const { response } = require("../helpers/dataResponse");
const dbUser = fs.readFile(path.join(__dirname,'../../db/users.json'));

const authUser = async (req, res)=>{
    try {
        const { username, password } = req.body
        console.log(req.body, 'asdasd');

        const users = await dbUser;
        const usersJson = JSON.parse(users)

        const usuarioEncontrado = usersJson.users.find((usuario) => {
            return (usuario.username === username && usuario.password === password) ;
        });
        console.log(usuarioEncontrado);

        if (usuarioEncontrado) {
            response(res, { payload: usuarioEncontrado, msg: "Se inicio Sesion correctamente" });
        } else {
            response(res, { msg: "Error al  consultar usuario", statusCode: 404 });
        }
    }  catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const getUsers = async (req, res) => {
    const users = await dbUser;
    const usersJson = JSON.parse(users)
    console.log(usersJson.users);

    response(res, {payload: usersJson, msg:""});
} 

const createUser = async (req, res) => {
    try {
        const { username, password, rol } = req.body;
        const users = await dbUser;
        const usersJson = JSON.parse(users)

        const dbCreateUser = {
            ...usersJson,
            ["users"]: [
                ...usersJson["users"],
                {
                    username,
                    password,
                    rol: parseInt(rol)
                }
            ]
        }

        await fs.writeFile(path.join(__dirname,'../../db/users.json'), JSON.stringify(dbCreateUser, null, 2), {encoding: 'utf-8'})
        console.log(dbCreateUser);

        response(res, { payload: usersJson, msg: "Se Creo el usuario." });

    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    authUser,
    getUsers,
    createUser
}