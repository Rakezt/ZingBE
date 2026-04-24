const express = require('express');
const connectionRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {
  sendConnectionRequest,
  reviewConnectionRequest,
} = require('../controllers/connectionController');

connectionRouter.post(
  '/request/send/:status/:userId',
  userAuth,
  sendConnectionRequest,
);
connectionRouter.post(
  '/request/review/:status/:connectionId',
  userAuth,
  reviewConnectionRequest,
);

module.exports = { connectionRouter };
