const UsuariosSchema = require("../../models/users.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const loginUser = async (req, res) => {
    const { usuario, password } = req.body;

    // Validación de entrada básica
    if (!usuario || !password) {
        return res.status(400).send('Usuario y contraseña son requeridos');
    }

    try {
        // Buscar al usuario por su nombre de usuario
        const user = await UsuariosSchema.findOne({ usuario });

        // Verificar si el usuario existe y la contraseña es correcta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            // Utilizando un mensaje de error genérico
            return res.status(401).send('Usuario o contraseña incorrecta');
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user._id, rol: user.rol },
            process.env.JWT_SECRET, // Uso de variable de entorno para la clave secreta
            { expiresIn: '1h' }
        );

        // Devolver el token y algunos detalles del usuario
        res.json({
            token,
            user: {
                id: user._id,
                usuario: user.usuario,
                rol: user.rol
            }
        });

    } catch (error) {
        // Manejo genérico de errores del servidor
        res.status(500).send('Error en el servidor: ' + error.message);
    }
};


// Obtener un usuario por ID
const getUserid = async (req, res) => {

    const { id } = req.params;
    const user = UsuariosSchema;
    user
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))

}

const getUsers = async (req, res) => {

    const user = UsuariosSchema;
    user
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
};


// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        // Generar salt y hash para la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Crear un nuevo usuario con la contraseña hash
        const user = new UsuariosSchema({
            ...req.body, // Tomar el resto de propiedades del cuerpo de la solicitud
            password: hashedPassword // Reemplazar la contraseña de texto plano con el hash
        });

        // Guardar el usuario en la base de datos
        const data = await user.save();
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un usuario existente
const updateUser = async (req, res) => {

    const { id } = req.params;
    const { nombre, apellidos, rol, usuario, password } = req.body;
    const user = UsuariosSchema;
    user
        .updateOne({ _id: id }, { $set: { nombre, apellidos, rol, usuario, password } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))

}

module.exports = {
    getUsers,
    loginUser,
    getUserid,
    createUser,
    updateUser
}