const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productosRouter = require('../api-json/routes/productos');
const usuariosRouter = require('../api-json/routes/usuarios');
const pedidosRouter = require('../api-json/routes/pedidos');

const app = express(); 
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const conexionbd = require('../api-json/bd');

conexionbd.on('error', console.error.bind(console, 'conexion fallida'));
conexionbd.once('open', function (){
    console.log('Base de datos abierta');
});

app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/pedidos', pedidosRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error en la api');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
