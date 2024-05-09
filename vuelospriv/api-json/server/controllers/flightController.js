// flightController.js
const Flight = require('../models/flight');
const connectDB = require('../config/database');



const flightController = {
    createFlight: async (req, res) => {
        try {
            // Obtener los datos del vuelo desde el cuerpo de la solicitud
            const { origin, destination, date } = req.body;
            
            // Crear un nuevo objeto Flight con los datos recibidos
            const newFlight = new Flight({ origin, destination, date });

            // Guardar el nuevo vuelo en la base de datos
            await newFlight.save();

            // Respuesta exitosa
            res.status(201).json({ message: 'Flight created successfully', flight: newFlight });
        } catch (error) {
            // Error del servidor
            console.error('Error creating flight:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAllFlights: async (req, res) => {
        try {
            // Obtener todos los vuelos desde la base de datos
            const flights = await Flight.find();

            // Respuesta exitosa con la lista de vuelos
            res.status(200).json({ flights });
        } catch (error) {
            // Error del servidor
            console.error('Error getting all flights:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getFlightById: async (req, res) => {
        try {
            // Obtener el ID del vuelo desde los parámetros de la solicitud
            const flightId = req.params.id;

            // Buscar el vuelo por su ID en la base de datos
            const flight = await Flight.findById(flightId);

            // Comprobar si se encontró el vuelo
            if (!flight) {
                // Vuelo no encontrado
                return res.status(404).json({ message: 'Flight not found' });
            }

            // Respuesta exitosa con el vuelo encontrado
            res.status(200).json({ flight });
        } catch (error) {
            // Error del servidor
            console.error('Error getting flight by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateFlight: async (req, res) => {
        try {
            // Obtener el ID del vuelo desde los parámetros de la solicitud
            const flightId = req.params.id;

            // Obtener los nuevos datos del vuelo desde el cuerpo de la solicitud
            const { origin, destination, date } = req.body;

            // Buscar y actualizar el vuelo por su ID en la base de datos
            const updatedFlight = await Flight.findByIdAndUpdate(flightId, { origin, destination, date }, { new: true });

            // Comprobar si se encontró y actualizó el vuelo
            if (!updatedFlight) {
                // Vuelo no encontrado
                return res.status(404).json({ message: 'Flight not found' });
            }

            // Respuesta exitosa con el vuelo actualizado
            res.status(200).json({ message: 'Flight updated successfully', flight: updatedFlight });
        } catch (error) {
            // Error del servidor
            console.error('Error updating flight:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteFlight: async (req, res) => {
        try {
            // Obtener el ID del vuelo desde los parámetros de la solicitud
            const flightId = req.params.id;

            // Buscar y eliminar el vuelo por su ID en la base de datos
            const deletedFlight = await Flight.findByIdAndDelete(flightId);

            // Comprobar si se encontró y eliminó el vuelo
            if (!deletedFlight) {
                // Vuelo no encontrado
                return res.status(404).json({ message: 'Flight not found' });
            }

            // Respuesta exitosa con el vuelo eliminado
            res.status(200).json({ message: 'Flight deleted successfully', flight: deletedFlight });
        } catch (error) {
            // Error del servidor
            console.error('Error deleting flight:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = flightController;
