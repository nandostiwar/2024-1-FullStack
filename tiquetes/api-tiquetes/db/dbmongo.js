const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URI

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErros: true,
    }
})

const validatedb = async () => {
    try {
        await client.connect();
        console.log("se conecto");
    } catch (error) {
        console.log(error);
    }
}

validatedb()