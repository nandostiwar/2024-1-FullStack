const { add, subtract, multiply } = require('../operaciones/operaciones.js');

function calcular(req, res) {
    const { body } = req;
    const { number1, number2, operacion } = body;
    let result;

    switch (operacion) {
        case 'sumar':
            result = add(number1, number2);
            break;
        case 'restar':
            result = subtract(number1, number2);
            break;
        case 'multiplicar':
            result = multiply(number1, number2);
            break;
        default:
            res.status(400).json({ error: 'Operación no válida' });
            return;
    }

    res.json({ resultado: result });
}

module.exports = {
    calcular
};
