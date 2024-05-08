const reservaSchema = require("../../models/reservas")

// Listar todos los pedidos
const listarReservas = async (req, res) => {
    const reservas = reservaSchema;
    reservas
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
};

// Agregar un nuevo pedido
const agregarReserva = async (req, res) => {
    const Reserva = reservaSchema;
    const { origen, destino, fecha, precio } = req.body;

    // Validación inicial de los datos de entrada
    if (!origen || !origen.pais || !destino || !destino.pais || !fecha || isNaN(precio) || precio < 0) {
        return res.status(400).json({ message: 'Datos de entrada inválidos. Asegúrate de que todos los campos necesarios estén completos y sean correctos.' });
    }

    try {
        const fechaInicio = new Date(fecha);
        fechaInicio.setHours(0, 0, 0, 0);
        const fechaFin = new Date(fecha);
        fechaFin.setHours(23, 59, 59, 999);

        // Verificar la disponibilidad para la fecha solicitada
        const existeReservacion = await Reserva.findOne({
            fecha: {
                $gte: fechaInicio,
                $lt: fechaFin
            }
        });
        if (existeReservacion) {
            return res.status(409).json({ message: 'Ya existe una reservación para ese día.' });
        }

        // Crear la nueva reservación
        const nuevaReservacion = new Reserva({
            origen: { pais: origen.pais },
            destino: { pais: destino.pais },
            fecha: fechaInicio,  // Uso de fechaInicio para mantener la consistencia
            precio
        });

        await nuevaReservacion.save();
        res.status(201).json(nuevaReservacion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reservación', error: error });
    }
};



// Actualizar un pedido existente
const UpdateReserva = async (req, res) => {
    console.log('falta agregar el handler')
};

module.exports = {
    listarReservas,
    agregarReserva,
    UpdateReserva
};
