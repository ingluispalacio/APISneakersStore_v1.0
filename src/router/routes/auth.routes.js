const express = require('express');
const router = express.Router(); 
const authController = require('../../controllers/auth.controller');
const userController = require('../../controllers/user.controller');

router
    .post('/singin', authController.login )
    .post('/singup', userController.create);

module.exports = router;