const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const ObtenerSignoPorTipo = async (req, res) => {

        const { tipo, signo } = req.params;
        
    try {
        
        switch (tipo) {
            case "Hombre":
                const HSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
                const HobjSignos = JSON.parse(HSignos);
                const Hresult = HobjSignos[signo];
                res.json(Hresult)
                break;
            case "Mujer":
                const MSignos = await fs.readFile(path.join(__dirname, '../../db/signosM.json'));
                const MobjSignos = JSON.parse(MSignos);
                const Mresult = MobjSignos[signo];
                res.json(Mresult)
                break;
            case "Nino":
                const NSignos = await fs.readFile(path.join(__dirname, '../../db/signosN.json'));
                const NobjSignos = JSON.parse(NSignos);
                const Nresult = NobjSignos[signo];
                res.json(Nresult)
                break;
            default:
                //break;
                res.status(400).json("Message: asdasd")
            break
            }

    } catch (error) {
            console.error(error);        
    }
    } 
const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' })

    res.json({
        message: "Updated"
    })
}

module.exports = {
    getAllSignos,
    ObtenerSignoPorTipo,
    updateSigno
}