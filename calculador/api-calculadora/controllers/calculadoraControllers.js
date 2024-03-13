const {add, subtract, multiply} = require('../operaciones/operaciones.js');

function sumar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    if (number1 === undefined || number2 === undefined) {
        return res.status(400).json({error: 'Faltan números en la solicitud'});
    }
    const result = add(number1, number2);
    res.json({
        resultado: result
    });
}

function restar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    if (number1 === undefined || number2 === undefined) {
        return res.status(400).json({error: 'Faltan números en la solicitud'});
    }
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    });
}

function multiplicar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    if (number1 === undefined || number2 === undefined) {
        return res.status(400).json({error: 'Faltan números en la solicitud'});
    }
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    });
}

module.exports = {
    sumar,
    restar,
    multiplicar
};
