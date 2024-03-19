const fs = require('fs/promises');
const path = require('path');

const listFood = async (req, res)=>{
    const restaurante = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    const restauranteJson = JSON.parse(restaurante)
    res.json(restauranteJson.Comidas);
}

const createFood = async (req, res)=>{
    console.log("comida creada")
    /*const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)*/
}

const updateFood = async (req, res)=>{
    console.log("comida actulizada")
    /*const signoEditar = req.params.signoEditar;
    const {textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/restaurante.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })*/
}

module.exports = {
    listFood,
    createFood,
    updateFood
}