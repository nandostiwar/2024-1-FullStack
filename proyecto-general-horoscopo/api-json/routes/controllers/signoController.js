const fs = require('fs/promises');
const path = require('path');

const consultaSignos = async (req, res)=>{
    console.log(req.body)
    const {signo,textoGenero} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const setSigno = objSignos[textoGenero][signo];
    res.json(setSigno)
}

const consultaEditar = async (req, res)=>{
    console.log(req.body)
    const {signoEditar, textoGenero, textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [textoGenero]:{...objSignos[textoGenero],[signoEditar]:textoEditar}
    }

    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json("a")
}

module.exports = {
    consultaSignos,
    consultaEditar
}