const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://santiago29:<santiago1>@paises.vi0qf82.mongodb.net/';
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to the database');
        return client.db('producto'); // Cambia 'producto' por el nombre de tu base de datos
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

module.exports = connectDB;
