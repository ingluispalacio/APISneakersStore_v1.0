const express = require('express');
const router = express.Router(); 
const productController = require('../../controllers/product.controller');

router
    .get('/', productController.get )
    .get('/prince/:userId/:name', productController.getspecialPrice )
    .get('/:id', productController.getById )
    .post('/', productController.create )
    .put('/:id', productController.update )
    .delete('/:id', productController._delete );

module.exports = router;