const router = require('express').Router();


router.use('/v2/Usuarios', require('./Usuarios.route'))


module.exports = router;