const express = require('express');
const router = express.Router();
const restaurantController = require('./controllers/restaurantController.js');
const userController = require('./controllers/userController.js');
const productController = require('./controllers/productController.js');
const salesController = require('./controllers/salesController.js');

// restaurant
router.get('/', restaurantController.getRestaurant);

//usuarios rutas
router.patch('/login', userController.login);
router.get('/users',userController.getAllUsers);
router.get('/user',userController.getUser);
router.post('/user',userController.createUser);
router.delete('/user',userController.deleteUser);
router.put('/user',userController.updateUser);

// productos rutas
router.get('/products',productController.getAllProducts);
router.post('/product',productController.createProduct);
router.delete('/product',productController.deleteProduct);
router.put('/product',productController.updateProduct);

// ventas rutas
router.get('/sales',salesController.getAllSales);
router.post('/sale',salesController.createSales);
router.put('/sale',salesController.updateSale);

module.exports = router;