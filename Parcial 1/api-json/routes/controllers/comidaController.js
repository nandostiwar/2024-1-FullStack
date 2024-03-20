const fs = require('fs/promises');
const path = require('path');

const listFood = async (req, res)=>{
    const restaurante = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    const restauranteJson = JSON.parse(restaurante)
    res.json(restauranteJson.Comidas);
}

const createFood = async (req, res) => {
    try {
        // Leemos el archivo JSON donde se almacenan los datos
        const dataPath = path.join(__dirname, '../../db/restaurante.json');
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);

        // Construimos el objeto de la nueva comida con un ID único
        const newFood = {
            id: data.Comidas.length + 1, // Esto asume que el ID es simplemente el siguiente número. Puede requerir ajustes.
            ...req.body // Esto añade todos los campos enviados en el cuerpo de la solicitud a la nueva comida
        };

        // Añadimos la nueva comida al array de comidas
        data.Comidas.push(newFood);

        // Guardamos el archivo JSON actualizado
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');

        // Respondemos con la nueva comida creada
        res.status(201).json(newFood);
    } catch (error) {
        // Manejamos cualquier error que pueda ocurrir
        console.error("Error al crear la comida:", error);
        res.status(500).json({ message: "Error al crear la comida" });
    }
};

const updateFood = async (req, res) => {
    const { id } = req.params; // Obtenemos el ID de la comida a actualizar
    const updates = req.body; // Obtenemos las actualizaciones del cuerpo de la solicitud

    try {
        const dataPath = path.join(__dirname, '../../db/restaurante.json');
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);

        // Buscamos el índice de la comida en el array
        const foodIndex = data.Comidas.findIndex(food => food.id == id);

        if (foodIndex === -1) {
            return res.status(404).json({ message: "Comida no encontrada" });
        }

        // Actualizamos los campos de la comida con las nuevas valores
        data.Comidas[foodIndex] = { ...data.Comidas[foodIndex], ...updates };

        // Guardamos el archivo JSON actualizado
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');

        // Respondemos con la comida actualizada
        res.json(data.Comidas[foodIndex]);
    } catch (error) {
        console.error("Error al actualizar la comida:", error);
        res.status(500).json({ message: "Error al actualizar la comida" });
    }
};

module.exports = {
    listFood,
    createFood,
    updateFood
}