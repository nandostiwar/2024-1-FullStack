const Ticket = require('../Models/Flight');

const flightController = {};

flightController.createFlight = async (req, res) => {
  try {
    const { origin, destination, day } = req.body;
    const existingFlight = await Ticket.findOne({destination, day});
    if (existingFlight) {
      return res.status(400).json({
        message: "Ya existe vuelo para este destino y día.",
        type: 'success'
      });
    }
    const flight = new Ticket({ origin, destination, day });
    await flight.save();
    res.status(201).json({
      message: "Ticket creado exitosamente.",
      type: 'success'
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error creando el ticket.",
      type: 'error'

    });
  }
};

flightController.getFlights = async (req, res) => {
  try {
    const flights = await Ticket.find();
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights", error);
    res.status(500).json({ message: "Error fetching flights" });
  }
};

module.exports = flightController;