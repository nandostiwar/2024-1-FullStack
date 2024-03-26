const fs = require('fs/promises');
const path = require('path');
const { response } = require("../helpers/dataResponse");
const dbDishes = fs.readFile(path.join(__dirname,'../../db/dishes.json'));