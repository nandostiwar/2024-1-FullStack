const Pais = require('../../db/Paises');
const Ticket = require('../../db/Tickets');

  const guardar = async (req, res) => {
    try {
      const { origin, destination, date } = req.body;
  
      const existingOriginTicket = await Ticket.findOne({ origin });
      if (existingOriginTicket) {
        return res.status(400).json({ message: 'Ya existe el mismo origen' });
      }
  
      const existingDestinationTicket = await Ticket.findOne({ destination });
      if (existingDestinationTicket) {
        return res.status(400).json({ message: 'Ya existe el mismo destino' });
      }
  
      const existingDateTicket = await Ticket.findOne({ date });
      if (existingDateTicket) {
        return res.status(400).json({ message: 'Ya la misma fecha' });
      }
  
      const newTicket = new Ticket({ origin, destination, date });
      await newTicket.save();
      res.status(201).json(newTicket);
    } catch (error) {
      console.error('Error al guardar el tiquete:', error);
      res.status(500).json({ message: 'Error al guardar el tiquete' });
    }
  };

  const obtener = async (req, res) => {
    const { query } = req.query;
    try {
      const regex = new RegExp(query, 'i');
      const paises = await Pais.find({ name: regex });
      res.json(paises);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la lista de países' });
    }
  };

module.exports = {
    obtener,
    guardar
};