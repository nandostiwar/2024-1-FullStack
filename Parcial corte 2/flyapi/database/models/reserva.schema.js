const { Schema, model } = require("mongoose");

const reserva = new Schema(
    {
        origen: {
            type: String,
            require: true
        },
        destino: {
            type: String,
            require: true
        },
        codigo: {
            type: String,
            require: true
        },
        fecha: {
            type: String,
            require: true
        },
        numero: {
            type: String,
            require: true
        }
    }
);

const reservaModel = model("reservas", reserva);
module.exports = {
    reservaModel
}