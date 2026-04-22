const express = require('express');
const authRouter = express.Router();
const { singUp, login, logout } = require('../controllers/authController');

authRouter.post('/signup', singUp);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

module.exports = { authRouter };
