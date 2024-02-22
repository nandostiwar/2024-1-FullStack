const { add, subtract, multiply } = require('../operaciones/operaciones.js');


function operaciones(req, res) {

    const { body } = req;
    const { number1, number2, operacion } = body;
    let result;

    switch (operacion) {
        case "sumar": result = add(number1, number2);
            break;
        case "restar": result = subtract(number1, number2);
            break;
        case "multiplicar": result = multiply(number1, number2);
            break;

        default:
            break;
    }

    res.json({
        resultado: result
    });
}

/*
function sumar(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = add(number1, number2);
    res.json({
        resultado: result
    });
}

function restar(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    })
}

function multiplicar(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    })
}*/

module.exports = {
    //sumar,
    //restar,
    //multiplicar
    operaciones
}