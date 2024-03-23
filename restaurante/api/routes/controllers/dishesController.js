const fs = require('fs/promises');
const path = require('path');
const { response } = require("../helpers/dataResponse");
const dbDishes = fs.readFile(path.join(__dirname,'../../db/dishes.json'));

const newDish = async (req, res) => {
    console.log(req.body);
    try {
        
        const dishes = await dbDishes;
        const dishesJson = JSON.parse(dishes);
        if((req.body.plato_id).trim() !== '') {
            console.log(dishesJson);
        }

    } catch (error) {
        console.log("Error -> ", error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    newDish
}