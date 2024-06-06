const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://miguelangeldelaluna544:NqcLA74GgTRleLgk@cluster0.gsqgq0p.mongodb.net/bdrestaurante';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conexion correcta con mongo');
}).catch((err) => {
    console.error('Conexion fallida con mongo', err);
});

module.exports = mongoose.connection; 