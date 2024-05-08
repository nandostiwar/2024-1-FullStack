const paischema = require("../../models/paises.js")

const getPaises = async (req, res) => {
    const pais = paischema;
    pais
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
};

const createPaises = async (req, res) => {
    try {
        // Verifica si req.body es un array
        if (Array.isArray(req.body)) {
            // Procesar un array de comidas
            const results = await Promise.all(req.body.map(async paisData => {
                const paises = new paischema(paisData);
                return await paises.save();
            }));
            res.json(results);
        } else {
            // Procesar un solo objeto de comida
            const paises = new paischema(req.body);
            const data = await paises.save();
            res.json(data);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};

module.exports = {
    getPaises,
    createPaises
}