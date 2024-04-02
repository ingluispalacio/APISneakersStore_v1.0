const express = require('express');
const router = express.Router(); 
const promotionController = require('../../controllers/promotion.controller');

router
    .get('/', promotionController.get )
    .get('/:id', promotionController.getById )
    .post('/', promotionController.create )
    .put('/:id', promotionController.update )
    .delete('/:id', promotionController._delete );

module.exports = router;