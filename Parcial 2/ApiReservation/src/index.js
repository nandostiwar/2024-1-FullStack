const express = require('express')
const {urlencoded, json} = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require('./routes/routes.js')
require("dotenv").config();


const app = express();
app.use(urlencoded({extended: true}))


app.use(cors())
app.use(express.json())
app.use('/v1/reservation', userRoutes);


const port = process.env.PORT || 9000;




app.get('/', (req, res) => {
    res.send("Welcome to my API");
})

mongoose
.connect(process.env.MONGOdb_URI)
.then(() => console.log("conectado a la base de datos Atlas"))
.catch((error) => console.error(error))


app.listen(9000, () => console.log('server listening port', port))