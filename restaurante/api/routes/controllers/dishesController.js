const fs = require('fs/promises');
const path = require('path');
const { response } = require("../helpers/dataResponse");
const dbDishes = fs.readFile(path.join(__dirname,'../../db/dishes.json'));

const newDish = async (req, res) => {
    try {
        console.log(req.body);
        const dishes = await dbDishes;
        const dishesJson = await JSON.parse(dishes);
        const { id, name, price, description } = req.body;
        if(id.trim() == '') {
            let maxId = 0;
            for (const dish of dishesJson.dishes) {
                console.log(dish.id);
                if (dish.id > maxId) {
                    maxId = dish.id;
                    console.log('enrto');
                }
            }
            maxId += 1;
            const newDish = { id: maxId, name, price, description }
            dishesJson.dishes.push(newDish);
            await fs.writeFile(path.join(__dirname,'../../db/dishes.json'), JSON.stringify(dishesJson, null, 2), {encoding: 'utf-8'})
            response(res, { payload: dishesJson, msg: "Se creo un nuevo plato" });
        }
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const updateDish = async (req, res) => {
    try {
        console.log(req.body);
        const dishes = await dbDishes;
        const dishesJson = await JSON.parse(dishes);
        const { id, name, price, description } = req.body;
        console.log('opa');
        const positionDish = dishesJson.dishes.findIndex(dish => dish.id === id);
        console.log('este es', positionDish);
        if (positionDish !== -1) {
            dishesJson.dishes.splice(positionDish, 1);
            const updateDish = {
                id,
                name,
                price,
                description
            };
            dishesJson.dishes.splice(positionDish, 0, updateDish);
            console.log("Plato eliminado y reemplazado:", dishesJson.dishes[positionDish]);
            response(res, { payload: dishesJson, msg: "Se actualizo el plato" });

        } else {
            console.log("Plato con el ID especificado no encontrado.");
        }
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const getDishes = async (req, res) => {
    try {
        const dishes = await dbDishes;
        const dishesJson = JSON.parse(dishes);
        response(res, {payload: dishesJson});
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

const deleteDish = async (req, res) => {
    try {
        const dishes = await dbDishes;
        const dishesJson = await JSON.parse(dishes);
        const positionDish = dishesJson.dishes.findIndex(dish => dish.id == req.params.id);
        dishesJson.dishes.splice(positionDish, 1);
        await fs.writeFile(path.join(__dirname,'../../db/dishes.json'), JSON.stringify(dishesJson, null, 2), {encoding: 'utf-8'})
        response(res, {payload: dishesJson, msg: "Se elimino el plato correctamente."});
    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    newDish,
    getDishes,
    updateDish,
    deleteDish
}