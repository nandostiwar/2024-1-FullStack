const express = require('express');
const { urlencoded, json } = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());

// Rutas relacionadas con usuarios
app.use('/v1/sitio', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});