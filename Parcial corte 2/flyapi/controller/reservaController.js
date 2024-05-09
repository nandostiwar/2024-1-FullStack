const { response } = require("./helpers/dataResponse");
const { reservaModel } = require('../database/models/reserva.schema');


const getReservas = async (req, res) => {
    try {
        const allReservas = await reservaModel.find();
        console.log('allReservas');
        console.log(allReservas);
        response(res, {payload: allReservas})
    } catch (error) {
        console.log("Error", error.message);
        return res.status(500).json(error.message);
    }
}

const createReserva = async (req, res) => {
    try {
        console.log(req.body);
        const { origen, destino, codigo, fecha, numero } = req.body
        const allReservas = await reservaModel.find();

        let reservaExistente = false;
        for (const reserva of allReservas) {
            if (reserva.origen === origen && reserva.destino === destino) 
            {
                reservaExistente = true;
                break;
            }}
        if (reservaExistente) {
            response(res, { msg: "Este vuelo ya esta reservado" });
        } else {
            try {
                const createReserva = await reservaModel.create({ origen, destino, codigo, fecha, numero });
                response(res, { payload: createReserva, msg: "Se creó la reserva correctamente." });
            } catch (error) {
                response(res, { msg: "Hubo un error al crear la reserva." });
            }
        }
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    createReserva,
    getReservas
}