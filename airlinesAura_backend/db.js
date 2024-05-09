const mongoose = require('mongoose');

// URL MongoDB
const mongoDBUrl = 'mongodb+srv://llperlaza55:7IBpy9kLwrypHCox@cluster0.krnv3ey.mongodb.net/airlinesAura';

// Connection MongoDB
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

module.exports = mongoose.connection;