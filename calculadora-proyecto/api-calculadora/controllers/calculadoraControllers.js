const {
    add,
    subtract,
    multiply
} = require('../operaciones/operaciones.js');

function sumar(req, res) {
    
    const {
        number1,
        number2,
    } = req;
    const result = add(number1, number2);
    return result;
}

function restar(req, res) {
    
    const {
        number1,
        number2
    } = req;
    const result = subtract(number1, number2);
    return result;
}

function multiplicar(req, res) {
    console.log(req);
    
    const {
        number1,
        number2
    } = req;
    const result = multiply(number1, number2);
    return result;
}

function operaciones(req, res) {
    const {
        body
    } = req;
    const{number1, number2, operacion} = body;
    console.log(operacion);
    var resultado;
    switch (operacion) {
        case 'sumar':
            resultado = sumar({
                number1,
                number2
            });

            break;

        case 'restar':
            resultado = restar({
                number1,
                number2
            });

            break;
        case 'multiplicar':
            resultado = multiplicar({
                number1,
                number2
            });

            break;

    }
    res.json({resultado});

}

module.exports = {
    sumar,
    restar,
    multiplicar,
    operaciones
}