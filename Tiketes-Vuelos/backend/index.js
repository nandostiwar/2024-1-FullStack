const express = require('express');
const mongoose = require("mongoose");

const {urlencoded, json} = require('express');
const router = require('./routes/tiket.routes.js');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors:true,
  }
})

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

//ruta api-tiketes
app.use(cors())
app.use('/v3/tiket', router);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a mongo'))
.catch((error) => console.error('Error al conectar a mongo', error));

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})