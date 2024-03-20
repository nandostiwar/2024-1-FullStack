const fs = require('fs/promises');
const path = require('path');

const listDrinks = async (req, res)=>{
    const restaurante = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    const restauranteJson = JSON.parse(restaurante)
    res.json(restauranteJson.Bebidas);
}

const createDrinks = async (req, res)=>{
    try {
        // Leemos el archivo JSON donde se almacenan los datos
        const dataPath = path.join(__dirname, '../../db/restaurante.json');
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);

        // Construimos el objeto de la nueva comida con un ID único
        const newDrinks = {
            id: data.Bebidas.length + 1, // Esto asume que el ID es simplemente el siguiente número. Puede requerir ajustes.
            ...req.body // Esto añade todos los campos enviados en el cuerpo de la solicitud a la nueva comida
        };

        // Añadimos la nueva comida al array de comidas
        data.Bebidas.push(newDrinks);

        // Guardamos el archivo JSON actualizado
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');

        // Respondemos con la nueva comida creada
        res.status(201).json(newDrinks);
    } catch (error) {
        // Manejamos cualquier error que pueda ocurrir
        console.error("Error al crear la Bebida:", error);
        res.status(500).json({ message: "Error al crear la Bebida" });
    }
}

const updatedrinks = async (req, res)=>{
    const { id } = req.params; // Obtenemos el ID de la comida a actualizar
    const updates = req.body; // Obtenemos las actualizaciones del cuerpo de la solicitud

    try {
        const dataPath = path.join(__dirname, '../../db/restaurante.json');
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);

        // Buscamos el índice de la comida en el array
        const drinksIndex = data.Bebidas.findIndex(drinks => drinks.id == id);

        if (drinksIndex === -1) {
            return res.status(404).json({ message: "Comida no encontrada" });
        }

        // Actualizamos los campos de la comida con las nuevas valores
        data.Bebidas[drinksIndex] = { ...data.Bebidas[drinksIndex], ...updates };

        // Guardamos el archivo JSON actualizado
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');

        // Respondemos con la comida actualizada
        res.json(data.Bebidas[drinksIndex]);
    } catch (error) {
        console.error("Error al actualizar la Bebida:", error);
        res.status(500).json({ message: "Error al actualizar la bebida" });
    }

}

module.exports ={
    listDrinks,
    createDrinks,
    updatedrinks
}