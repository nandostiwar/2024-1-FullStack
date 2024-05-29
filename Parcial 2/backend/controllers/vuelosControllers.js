const Pais = require('../../backend/db/pais');
const Vuelo = require('../../backend/db/vuelos');


const obtenerPaises = async (req, res) => {
    const { query } = req.query;
    console.log(req.query);
    try {
        
        const paises = await Pais.find({}, 'name');
        console.log(paises); 
        res.json(paises); 
    } catch (error) {
        
        res.status(500).json({ error: 'Error al obtener la lista de países' });
    }
};

const guardarVuelo = async (req, res) => {
  try {
    const { origin, destination, date } = req.body;


    

    if (origin ===destination){

      return res.status(400).json({message:'El pais de origen y destion no pueden ser los mismos.'});
    }

    
    const existingOriginVuelo = await Vuelo.findOne({ origin });
    if (existingOriginVuelo) {
      return res.status(400).json({ message: 'Ya existe un boleto con el mismo origen' });
    }

    
    const existingDestinationVuelo = await Vuelo.findOne({ destination });
    if (existingDestinationVuelo) {
      return res.status(400).json({ message: 'Ya existe un boleto con el mismo destino' });
    }

   
    const existingDateVuelo = await Vuelo.findOne({ date });
    if (existingDateVuelo) {
      return res.status(400).json({ message: 'Ya existe un boleto con la misma fecha' });
    }

    // Si no existe ningún boleto con los mismos datos, guardar el nuevo boleto
    const newVuelo = new Vuelo({ origin, destination, date });
    await newVuelo.save();
    res.status(201).json(newVuelo);
  } catch (error) {
    console.error('Error al guardar el tiquete:', error);
    res.status(500).json({ message: 'Error al guardar el tiquete' });
  }
};


module.exports = {
    obtenerPaises,
    guardarVuelo
};
