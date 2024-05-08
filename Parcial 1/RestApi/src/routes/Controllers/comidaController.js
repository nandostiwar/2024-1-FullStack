const ComidaSchema = require("../../models/comidas.js")

const listFood = async (req, res) => {
    const comida = ComidaSchema;
    comida
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
}

const createFood = async (req, res) => {
    try {
        // Verifica si req.body es un array
        if (Array.isArray(req.body)) {
            // Procesar un array de comidas
            const results = await Promise.all(req.body.map(async comidaData => {
                const comida = new ComidaSchema(comidaData);
                return await comida.save();
            }));
            res.json(results);
        } else {
            // Procesar un solo objeto de comida
            const comida = new ComidaSchema(req.body);
            const data = await comida.save();
            res.json(data);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateFood = async (req, res) => {

    const { id } = req.params;
    const { name, description, price, imageUrl, estado } = req.body;
    const comida = ComidaSchema;
    comida
        .updateOne({ _id: id }, { $set: { name, description, price, imageUrl, estado } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))

};

module.exports = {
    listFood,
    createFood,
    updateFood
}