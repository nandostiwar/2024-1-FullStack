const router = require('express').Router();
const Usuarios = require('../../models/Usuarios');


router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuarios.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({error: 'Ha ocurrido un error'});
    }
});


module.exports = router;