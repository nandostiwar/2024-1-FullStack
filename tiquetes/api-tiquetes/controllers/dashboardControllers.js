var fs = require('fs');

(async (req,res) => {
    const contenido = fs.readFileSync('controllers/Countries.json', 'utf-8');

    const data = JSON.parse(contenido);
    try {
        const resultado = await pool.db('tiquetes').collection('Countries').insertMany(data.countries, {session});
        await session.commitTransaction();
        res.send(`${resultado.insertedCount} documentos insertados correctamente.`);
    } catch (error) {
        res.send(JSON.stringify({"Error server message": "Ha ocurrido algo"}));
        await session.abortTransaction();
    } finally{
        await session.endSession();
    }
})();