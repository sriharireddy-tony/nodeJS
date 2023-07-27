const express = require('express');
const router = express.Router();
const verifyToken = require('../Middlewares/verifyToken')
const refreshToken = require('../Middlewares/refreshToken')

const userController = require('../Controllers/Register');

// Route for user registration
router.post('/register', userController.register);
router.get('/getRegister',verifyToken , userController.getRegister);
router.post('/login', userController.login);
router.get('/deleteUser', verifyToken, userController.deleteUser);
router.post('/refreshToken',refreshToken, userController.refreshToken);

module.exports = router;