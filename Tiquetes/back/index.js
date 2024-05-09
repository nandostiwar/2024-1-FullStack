const express = require('express');
const mongoose = require("mongoose");
const {urlencoded, json} = require('express');
const router = require('./routes/tiket.routes.js');
const cors = require('cors');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Conexion BD'))
.catch((error) => console.error(error));

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/reserva', router);

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})