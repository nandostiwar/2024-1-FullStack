const Flight = require('../Models/Flight');

const flightController = {};

flightController.createFlight = async (req, res) => {
  try {
    const { origin, destination, day } = req.body;
    const existingFlight = await Flight.findOne({ destination, day });
    if (existingFlight) {
      return res.status(400).json({ message: "Flight already exists for this destination and day." });
    }
    const flight = new Flight({ origin, destination, day });
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    console.error("Error creating flight", error);
    res.status(500).json({ message: "Error creating flight" });
  }
};

flightController.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights", error);
    res.status(500).json({ message: "Error fetching flights" });
  }
};

module.exports = flightController;