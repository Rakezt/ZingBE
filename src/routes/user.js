const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {
  receiveRequest,
  userConnection,
  userFeed,
} = require('../controllers/userController');

userRouter.get('/user/request/received', userAuth, receiveRequest);
userRouter.get('/user/connections', userAuth, userConnection);
userRouter.get('/user/feed', userAuth, userFeed);

module.exports = { userRouter };
