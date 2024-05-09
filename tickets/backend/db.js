const mongoose = require('mongoose');

// URL de conexión a tu base de datos MongoDB
const mongoDBUrl = "mongodb+srv://DiegoFernando12:chicosolitario1@cluster0.vrto7kn.mongodb.net/AerolinesD";

// Conexión a MongoDB
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

module.exports = mongoose.connection;