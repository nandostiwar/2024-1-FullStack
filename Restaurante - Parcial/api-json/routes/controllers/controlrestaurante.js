const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000; // Puedes cambiar el puerto si lo deseas

app.use(bodyParser.json());
app.use(cors());

// Ruta para actualizar los datos de usuario
app.put('/api/users/:username', (req, res) => {
    const username = req.params.username;
    const newData = req.body;

    // Lee los datos del archivo JSON
    const userData = JSON.parse(fs.readFileSync('userData.json'));

    // Encuentra y actualiza el usuario correspondiente
    const updatedData = userData.map(user => {
        if (user.username === username) {
            return { ...user, ...newData };
        }
        return user;
    });

    // Guarda los datos actualizados en el archivo JSON
    fs.writeFileSync('userData.json', JSON.stringify(updatedData, null, 2));

    res.json({ success: true, message: 'Datos de usuario actualizados correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
