const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res)=>{
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}

const updateSigno = async (req, res)=>{
    const {signoEditar,textoGenero,textoEditar} = req.body;
    console.log(req.body)
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [textoGenero]: {
            ...objSignos[textoGenero],
            [signoEditar]:textoEditar
        }
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno
}